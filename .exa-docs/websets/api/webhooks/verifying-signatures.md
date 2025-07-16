# Verifying Signatures - Exa

> **Source:** https://docs.exa.ai/websets/api/webhooks/verifying-signatures  
> **Last Updated:** 2025-07-16T10:35:46.403Z

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

](/changelog/markdown-contents-as-default)

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

javascript

Copy

Ask AI

```
const crypto = require('crypto');

function verifyWebhookSignature(payload, signatureHeader, webhookSecret) {
    /**
     * Verify the signature of a webhook payload.
     *
     * @param {string} payload - The raw request body as a string
     * @param {string} signatureHeader - The Exa-Signature header value
     * @param {string} webhookSecret - Your webhook secret
     * @returns {boolean} True if signature is valid, false otherwise
     */
    try {
        // Parse the signature header
        const pairs = signatureHeader.split(',').map(pair => pair.split('='));
        const timestamp = pairs.find(([key]) => key === 't')?.[1];
        const signatures = pairs
            .filter(([key]) => key === 'v1')
            .map(([, value]) => value);

        if (!timestamp || signatures.length === 0) {
            return false;
        }

        // Optional: Check if timestamp is recent (within 5 minutes)
        const currentTime = Math.floor(Date.now() / 1000);
        if (Math.abs(currentTime - parseInt(timestamp)) > 300) {
            console.warn('Warning: Webhook timestamp is more than 5 minutes old');
        }

        // Create the signed payload
        const signedPayload = `${timestamp}.${payload}`;

        // Compute the expected signature
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(signedPayload)
            .digest('hex');

        // Compare with provided signatures using timing-safe comparison
        return signatures.some(sig =>
            crypto.timingSafeEqual(
                Buffer.from(expectedSignature, 'hex'),
                Buffer.from(sig, 'hex')
            )
        );

    } catch (error) {
        console.error('Error verifying signature:', error);
        return false;
    }
}

// Example usage in an Express.js webhook endpoint
const express = require('express');
const app = express();

// Important: Use raw body parser for webhook verification
app.use('/webhook', express.raw({ type: 'application/json' }));

app.post('/webhook', (req, res) => {
    const payload = req.body.toString();
    const signatureHeader = req.headers['exa-signature'] || '';
    const webhookSecret = process.env.WEBHOOK_SECRET;

    // Verify the signature
    if (!verifyWebhookSignature(payload, signatureHeader, webhookSecret)) {
        return res.status(400).json({ error: 'Invalid signature' });
    }

    // Process the webhook
    const webhookData = JSON.parse(payload);
    console.log(`Received ${webhookData.type} event`);

    res.json({ status: 'success' });
});
```

java

Copy

Ask AI

```
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class WebhookTest {

    /**
    * Verify the signature of a webhook payload.
    *
    * @param payload The raw request body as a string
    * @param signatureHeader The Exa-Signature header value
    * @param webhookSecret Your webhook secret
    * @return true if signature is valid, false otherwise
    */
    public static boolean verifyWebhookSignature(String payload, String signatureHeader, String webhookSecret) {
        try {
            // Parse the signature header
            String[] pairs = signatureHeader.split(",");
            String timestamp = null;
            List<String> signatures = new ArrayList<>();

            for (String pair : pairs) {
                String[] keyValue = pair.split("=", 2);
                if (keyValue.length == 2) {
                    String key = keyValue[0];
                    String value = keyValue[1];

                    if ("t".equals(key)) {
                        timestamp = value;
                    } else if ("v1".equals(key)) {
                        signatures.add(value);
                    }
                }
            }

            if (timestamp == null || signatures.isEmpty()) {
                return false;
            }

            // Optional: Check if timestamp is recent (within 5 minutes)
            long currentTime = Instant.now().getEpochSecond();
            long webhookTime = Long.parseLong(timestamp);
            if (Math.abs(currentTime - webhookTime) > 300) {
                System.out.println("Warning: Webhook timestamp is more than 5 minutes old");
            }

            // Create the signed payload
            String signedPayload = timestamp + "." + payload;

            // Compute the expected signature
            String expectedSignature = computeHmacSha256(signedPayload, webhookSecret);

            // Compare with provided signatures using timing-safe comparison
            return signatures.stream().anyMatch(sig -> timingSafeEquals(expectedSignature, sig));

        } catch (Exception e) {
            System.err.println("Error verifying signature: " + e.getMessage());
            return false;
        }
    }

    /**
    * Compute HMAC SHA256 signature.
    */
    private static String computeHmacSha256(String data, String key)
            throws NoSuchAlgorithmException, InvalidKeyException {
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        mac.init(secretKeySpec);
        byte[] hash = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        return bytesToHex(hash);
    }

    /**
    * Convert byte array to hexadecimal string.
    */
    private static String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }

    /**
    * Timing-safe string comparison to prevent timing attacks.
    */
    private static boolean timingSafeEquals(String a, String b) {
        if (a.length() != b.length()) {
            return false;
        }

        int result = 0;
        for (int i = 0; i < a.length(); i++) {
            result |= a.charAt(i) ^ b.charAt(i);
        }
        return result == 0;
    }

    // Example usage and test
    public static void main(String[] args) {
        System.out.println("🚀 === Exa Webhook Signature Verification Test ===\n");

        // Test with a known payload and signature
        String testPayload = "{\"type\":\"webset.created\",\"data\":{\"id\":\"ws_test\"}}";
        String testSecret = "test_webhook_secret";
        String testTimestamp = String.valueOf(Instant.now().getEpochSecond());

        try {
            // Create test signature
            String signedPayload = testTimestamp + "." + testPayload;
            String testSignature = computeHmacSha256(signedPayload, testSecret);
            String testHeader = "t=" + testTimestamp + ",v1=" + testSignature;

            System.out.println("📋 Test Data:");
            System.out.println("   • Payload: " + testPayload);
            System.out.println("   • Secret: " + testSecret);
            System.out.println("   • Timestamp: " + testTimestamp);
            System.out.println("   • Generated Signature: " + testSignature);
            System.out.println("   • Header: " + testHeader);
            System.out.println();

            System.out.println("🧪 Running Tests...");

            // Test verification
            boolean isValid = verifyWebhookSignature(testPayload, testHeader, testSecret);
            System.out.println("   ✓ Valid signature verification: " + (isValid ? "✅ PASSED" : "❌ FAILED"));

            // Test with invalid signature
            String invalidHeader = "t=" + testTimestamp + ",v1=invalid_signature";
            boolean isInvalid = verifyWebhookSignature(testPayload, invalidHeader, testSecret);
            System.out.println("   ✓ Invalid signature rejection: " + (!isInvalid ? "✅ PASSED" : "❌ FAILED"));

            // Test with missing timestamp
            String noTimestampHeader = "v1=" + testSignature;
            boolean noTimestamp = verifyWebhookSignature(testPayload, noTimestampHeader, testSecret);
            System.out.println("   ✓ Missing timestamp rejection: " + (!noTimestamp ? "✅ PASSED" : "❌ FAILED"));

            // Test with empty header
            boolean emptyHeader = verifyWebhookSignature(testPayload, "", testSecret);
            System.out.println("   ✓ Empty header rejection: " + (!emptyHeader ? "✅ PASSED" : "❌ FAILED"));

            // Test with malformed header
            boolean malformedHeader = verifyWebhookSignature(testPayload, "invalid-header-format", testSecret);
            System.out.println("   ✓ Malformed header rejection: " + (!malformedHeader ? "✅ PASSED" : "❌ FAILED"));

            System.out.println();

            // Example webhook processing
            if (isValid) {
                System.out.println("🎉 === Processing Valid Webhook ===");
                System.out.println("   Processing webhook payload: " + testPayload);
                // Here you would parse the JSON and handle the webhook event
                System.out.println("   Webhook processed successfully!");
                System.out.println();
                System.out.println("🔒 Security verification complete! Your webhook signature verification is working correctly.");
            }

        } catch (Exception e) {
            System.err.println("❌ Test failed with error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
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

Assistant

Responses are generated using AI and may contain mistakes.

[List webhook attempts](/websets/api/webhooks/attempts/list-webhook-attempts)[Types](/websets/api/events/types)