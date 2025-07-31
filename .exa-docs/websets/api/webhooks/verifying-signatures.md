# Verifying Signatures - Exa

> **Source:** https://docs.exa.ai/websets/api/webhooks/verifying-signatures  
> **Last Updated:** 2025-07-31T04:45:49.237Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Webhooks

Verifying Signatures

[Documentation

](/reference/getting-started)[Examples

](/examples/exa-mcp)[Integrations

](/integrations/vercel)[SDKs

](/sdks/python-sdk-specification)[Websets

](/websets/overview)[Changelog

](/changelog/geolocation-filter-support)

*   [
    
    Discord](https://discord.com/invite/HCShtBqbfV)
*   [
    
    Blog](https://exa.ai/blog)

##### Getting Started

*   [
    
    Overview
    
    
    
    ](/websets/overview)
*   [
    
    FAQ
    
    
    
    ](/websets/faq)

##### Dashboard

*   [
    
    Get started
    
    
    
    ](/websets/dashboard/get-started)
*   [
    
    Example queries
    
    
    
    ](/websets/dashboard/websets-example-queries)
*   [
    
    Import from CSV
    
    
    
    ](/websets/dashboard/import-from-csv)
*   [
    
    Exclude Results
    
    
    
    ](/websets/dashboard/exclude-results)
*   [
    
    Integrations
    
    
    
    ](/websets/dashboard/integrations)
*   Videos
    

##### API

*   [
    
    Overview
    
    
    
    ](/websets/api/overview)
*   [
    
    Get started
    
    
    
    ](/websets/api/get-started)
*   [
    
    How It Works
    
    
    
    ](/websets/api/how-it-works)
*   Core
    
*   Imports
    
*   Monitors
    
*   Webhooks
    
    *   [POST
        
        Create a Webhook
        
        
        
        ](/websets/api/webhooks/create-a-webhook)
    *   [GET
        
        Get a Webhook
        
        
        
        ](/websets/api/webhooks/get-a-webhook)
    *   [PATCH
        
        Update a Webhook
        
        
        
        ](/websets/api/webhooks/update-a-webhook)
    *   [DEL
        
        Delete a Webhook
        
        
        
        ](/websets/api/webhooks/delete-a-webhook)
    *   [GET
        
        List webhooks
        
        
        
        ](/websets/api/webhooks/list-webhooks)
    *   [GET
        
        List webhook attempts
        
        
        
        ](/websets/api/webhooks/attempts/list-webhook-attempts)
    *   [
        
        Verifying Signatures
        
        
        
        ](/websets/api/webhooks/verifying-signatures)
*   Events
    

On this page

*   [How Webhook Signatures Work](#how-webhook-signatures-work)
*   [Verification Process](#verification-process)
*   [Security Best Practices](#security-best-practices)
*   [Troubleshooting](#troubleshooting)
*   [Invalid Signature Errors](#invalid-signature-errors)
*   [Testing Signatures Locally](#testing-signatures-locally)
*   [What’s Next?](#what%E2%80%99s-next%3F)

When you receive a webhook from Exa, you should verify that it came from us to ensure the integrity and authenticity of the data. Exa signs all webhook payloads with a secret key that’s unique to your webhook endpoint.

## 

[​

](#how-webhook-signatures-work)

How Webhook Signatures Work

Exa uses HMAC SHA256 to sign webhook payloads. The signature is included in the `Exa-Signature` header, which contains:

*   A timestamp (`t=`) indicating when the webhook was sent
*   One or more signatures (`v1=`) computed using the timestamp and payload

The signature format looks like this:

Copy

Ask AI

```
Exa-Signature: t=1234567890,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd
```

## 

[​

](#verification-process)

Verification Process

To verify a webhook signature:

1.  Extract the timestamp and signatures from the `Exa-Signature` header
2.  Create the signed payload by concatenating the timestamp, a period, and the raw request body
3.  Compute the expected signature using HMAC SHA256 with your webhook secret
4.  Compare your computed signature with the provided signatures

*   Python
*   JavaScript/Node.js
*   Java

python

Copy

Ask AI

```
import hmac
import hashlib
import time

def verify_webhook_signature(payload, signature_header, webhook_secret):
    """
    Verify the signature of a webhook payload.

    Args:
        payload (str): The raw request body as a string
        signature_header (str): The Exa-Signature header value
        webhook_secret (str): Your webhook secret

    Returns:
        bool: True if signature is valid, False otherwise
    """
    try:
        # Parse the signature header
        pairs = [pair.split('=', 1) for pair in signature_header.split(',')]
        timestamp = None
        signatures = []

        for key, value in pairs:
            if key == 't':
                timestamp = value
            elif key == 'v1':
                signatures.append(value)

        if not timestamp or not signatures:
            return False

        # Optional: Check if timestamp is recent (within 5 minutes)
        current_time = int(time.time())
        if abs(current_time - int(timestamp)) > 300:
            print("Warning: Webhook timestamp is more than 5 minutes old")

        # Create the signed payload
        signed_payload = f"{timestamp}.{payload}"

        # Compute the expected signature
        expected_signature = hmac.new(
            webhook_secret.encode('utf-8'),
            signed_payload.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()

        # Compare with provided signatures
        return any(hmac.compare_digest(expected_signature, sig) for sig in signatures)

    except Exception as e:
        print(f"Error verifying signature: {e}")
        return False

# Example usage in a Flask webhook endpoint
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def handle_webhook():
    # Get the raw payload and signature
    payload = request.get_data(as_text=True)
    signature_header = request.headers.get('Exa-Signature', '')
    webhook_secret = os.environ.get('WEBHOOK_SECRET')

    # Verify the signature
    if not verify_webhook_signature(payload, signature_header, webhook_secret):
        return jsonify({'error': 'Invalid signature'}), 400

    # Process the webhook
    webhook_data = request.get_json()
    print(f"Received {webhook_data['type']} event")

    return jsonify({'status': 'success'}), 200
```

* * *

  

## 

[​

](#security-best-practices)

Security Best Practices

Following these practices will help ensure your webhook implementation is secure and robust:

*   **Always Verify Signatures** - Never process webhook data without first verifying the signature. This prevents attackers from sending fake webhooks to your endpoint.
*   **Use Timing-Safe Comparison** - When comparing signatures, use functions like `hmac.compare_digest()` in Python or `crypto.timingSafeEqual()` in Node.js to prevent timing attacks.
*   **Check Timestamp Freshness** - Consider rejecting webhooks with timestamps that are too old (e.g., older than 5 minutes) to prevent replay attacks.
*   **Store Secrets Securely** - Store your webhook secrets in environment variables or a secure secret management system. Never hardcode them in your application. **Important**: The webhook secret is only returned when you [create a webhook](https://docs.exa.ai/websets/api/webhooks/create-a-webhook) - make sure to save it securely as it cannot be retrieved later.
*   **Use HTTPS** - Always use HTTPS endpoints for your webhooks to ensure the data is encrypted in transit.

* * *

  

## 

[​

](#troubleshooting)

Troubleshooting

### 

[​

](#invalid-signature-errors)

Invalid Signature Errors

If you’re getting signature verification failures:

1.  **Check the raw payload**: Make sure you’re using the raw request body, not a parsed JSON object
2.  **Verify the secret**: Ensure you’re using the correct webhook secret from when the webhook was created
3.  **Check header parsing**: Make sure you’re correctly extracting the timestamp and signatures from the header
4.  **Encoding issues**: Ensure consistent UTF-8 encoding throughout the verification process

### 

[​

](#testing-signatures-locally)

Testing Signatures Locally

You can test your signature verification logic using the webhook secret and a sample payload:

python

Copy

Ask AI

```
# Test with a known payload and signature
test_payload = '{"type":"webset.created","data":{"id":"ws_test"}}'
test_timestamp = "1234567890"
test_secret = "your_webhook_secret"

# Create test signature
import hmac
import hashlib

signed_payload = f"{test_timestamp}.{test_payload}"
test_signature = hmac.new(
    test_secret.encode('utf-8'),
    signed_payload.encode('utf-8'),
    hashlib.sha256
).hexdigest()

test_header = f"t={test_timestamp},v1={test_signature}"

# Verify it works
is_valid = verify_webhook_signature(test_payload, test_header, test_secret)
print(f"Test signature valid: {is_valid}")  # Should print True
```

* * *

  

## 

[​

](#what%E2%80%99s-next%3F)

What’s Next?

*   Learn about [webhook events](/websets/api/events) and their payloads
*   Set up [webhook retries and monitoring](/websets/api/webhooks/attempts/list-webhook-attempts)
*   Explore [webhook management endpoints](/websets/api/webhooks/create-a-webhook)

[List webhook attempts](/websets/api/webhooks/attempts/list-webhook-attempts)[Types](/websets/api/events/types)

Assistant

Responses are generated using AI and may contain mistakes.