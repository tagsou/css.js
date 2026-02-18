// Step 1: Check if camera is delegated to you
console.log('Camera delegated:', document.featurePolicy.allowsFeature('camera'));

// Step 2: Check grant state
const status = await navigator.permissions.query({ name: 'camera' });
console.log('Camera state:', status.state); // 'granted', 'prompt', or 'denied'

// Step 3: Actually try to get the stream
try {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  console.log('[+] GOT CAMERA ACCESS!', stream);
  
  // Clean up after confirming it works
  stream.getTracks().forEach(t => t.stop());
} catch(e) {
  console.log('[-] Failed:', e.name, e.message);
}
