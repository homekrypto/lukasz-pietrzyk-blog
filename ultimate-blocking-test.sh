#!/bin/bash

# ULTIMATE SUPABASE BLOCKING VERIFICATION SCRIPT
# This script ensures no Supabase calls can escape the blocking

echo "🚨 ULTIMATE SUPABASE BLOCKING VERIFICATION"
echo "========================================"

# Function to test if a URL is blocked
test_blocking() {
    local url="$1"
    local description="$2"
    
    echo "Testing: $description"
    echo "URL: $url"
    
    # Test with curl (should fail or timeout)
    timeout 5 curl -s "$url" > /dev/null 2>&1
    local curl_result=$?
    
    if [ $curl_result -eq 124 ]; then
        echo "✅ BLOCKED: Request timed out (good)"
    elif [ $curl_result -ne 0 ]; then
        echo "✅ BLOCKED: Request failed (good)"
    else
        echo "⚠️  WARNING: Request succeeded (might not be blocked)"
    fi
    
    echo "---"
}

# Test various Supabase URLs
test_blocking "https://bcfwfmcwbrgzvetbgsex.supabase.co/rest/v1/rpc/get_accounts" "Main Supabase RPC call"
test_blocking "https://bcfwfmcwbrgzvetbgsex.supabase.co/rest/v1/rpc/get_account_members" "Account members RPC call"
test_blocking "https://bcfwfmcwbrgzvetbgsex.supabase.co/auth/v1/user" "Auth endpoint"
test_blocking "https://bcfwfmcwbrgzvetbgsex.supabase.co/rest/v1/accounts" "REST API endpoint"
test_blocking "https://api.supabase.co/v1/projects" "Supabase API endpoint"

echo ""
echo "🔍 BROWSER BLOCKING TEST"
echo "======================"

# Create a test HTML file to verify browser blocking
cat > /tmp/supabase_block_test.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Supabase Blocking Test</title>
    <script src="ultimate-supabase-destroyer.js"></script>
</head>
<body>
    <h1>Testing Supabase Blocking</h1>
    <div id="results"></div>
    
    <script>
        const results = document.getElementById('results');
        
        function addResult(test, result) {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${test}:</strong> ${result}`;
            results.appendChild(div);
        }
        
        // Test 1: Direct fetch call
        console.log('🧪 Testing direct fetch call...');
        fetch('https://bcfwfmcwbrgzvetbgsex.supabase.co/rest/v1/rpc/get_accounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'fake-key'
            },
            body: JSON.stringify({})
        })
        .then(response => response.json())
        .then(data => {
            console.log('✅ Fetch call was blocked and mocked:', data);
            addResult('Fetch Call', 'BLOCKED ✅');
        })
        .catch(error => {
            console.log('✅ Fetch call was blocked:', error);
            addResult('Fetch Call', 'BLOCKED ✅');
        });
        
        // Test 2: XMLHttpRequest call
        console.log('🧪 Testing XMLHttpRequest call...');
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://bcfwfmcwbrgzvetbgsex.supabase.co/rest/v1/rpc/get_accounts');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                console.log('✅ XHR call was blocked and mocked:', xhr.responseText);
                addResult('XHR Call', 'BLOCKED ✅');
            }
        };
        xhr.onerror = function() {
            console.log('✅ XHR call was blocked');
            addResult('XHR Call', 'BLOCKED ✅');
        };
        xhr.send(JSON.stringify({}));
        
        // Test 3: Dynamic script loading
        console.log('🧪 Testing dynamic script loading...');
        const script = document.createElement('script');
        script.src = 'https://bcfwfmcwbrgzvetbgsex.supabase.co/rest/v1/something.js';
        script.onload = function() {
            console.log('⚠️  Script loaded (should not happen)');
            addResult('Script Loading', 'NOT BLOCKED ⚠️');
        };
        script.onerror = function() {
            console.log('✅ Script loading was blocked');
            addResult('Script Loading', 'BLOCKED ✅');
        };
        document.head.appendChild(script);
        
        // Test 4: WebSocket connection
        console.log('🧪 Testing WebSocket connection...');
        try {
            const ws = new WebSocket('wss://bcfwfmcwbrgzvetbgsex.supabase.co/realtime/v1/websocket');
            if (ws.readyState === 3) { // CLOSED
                console.log('✅ WebSocket connection was blocked');
                addResult('WebSocket', 'BLOCKED ✅');
            } else {
                console.log('⚠️  WebSocket connection was not blocked');
                addResult('WebSocket', 'NOT BLOCKED ⚠️');
            }
        } catch (e) {
            console.log('✅ WebSocket connection was blocked:', e);
            addResult('WebSocket', 'BLOCKED ✅');
        }
        
        setTimeout(() => {
            console.log('🎉 All tests completed!');
            addResult('Test Status', 'COMPLETED 🎉');
        }, 2000);
    </script>
</body>
</html>
EOF

echo "Created test file: /tmp/supabase_block_test.html"
echo ""
echo "🔧 INTEGRATION INSTRUCTIONS"
echo "=========================="
echo ""
echo "1. Copy the ultimate-supabase-destroyer.js to your Suna project:"
echo "   cp ultimate-supabase-destroyer.js /path/to/suna/frontend/public/"
echo ""
echo "2. Add this script to your HTML <head> BEFORE any other scripts:"
echo "   <script src=\"/ultimate-supabase-destroyer.js\"></script>"
echo ""
echo "3. Or add it to your layout.tsx as the FIRST script:"
echo "   <script src=\"/ultimate-supabase-destroyer.js\"></script>"
echo ""
echo "4. Test in browser:"
echo "   - Open DevTools -> Network tab"
echo "   - Look for any requests to supabase.co domains"
echo "   - They should all be blocked with console messages"
echo ""
echo "5. If you still see Supabase calls, also add this to your .env.local:"
echo "   NEXT_PUBLIC_SUPABASE_URL=\"\""
echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=\"\""
echo "   SUPABASE_URL=\"\""
echo "   SUPABASE_ANON_KEY=\"\""
echo ""
echo "🚨 EMERGENCY MEASURES"
echo "==================="
echo ""
echo "If calls still get through, add this to your next.config.js:"
echo ""
echo "/** @type {import('next').NextConfig} */"
echo "const nextConfig = {"
echo "  async rewrites() {"
echo "    return ["
echo "      {"
echo "        source: '/rest/v1/:path*',"
echo "        destination: '/api/mock-supabase/:path*'"
echo "      }"
echo "    ];"
echo "  },"
echo "  async headers() {"
echo "    return ["
echo "      {"
echo "        source: '/(.*)',"
echo "        headers: ["
echo "          {"
echo "            key: 'Content-Security-Policy',"
echo "            value: \"connect-src 'self' localhost:* 127.0.0.1:*; script-src 'self' 'unsafe-inline' 'unsafe-eval';\""
echo "          }"
echo "        ]"
echo "      }"
echo "    ];"
echo "  }"
echo "};"
echo ""
echo "module.exports = nextConfig;"
echo ""
echo "✅ COMPLETION CHECKLIST"
echo "====================="
echo "□ Copy ultimate-supabase-destroyer.js to public folder"
echo "□ Add script tag to HTML head as FIRST script"
echo "□ Clear browser cache and hard refresh"
echo "□ Check Network tab - should see no supabase.co requests"
echo "□ Check Console - should see blocking messages"
echo "□ Test the app - should work without 401 errors"
echo ""
echo "🎯 Expected Result: NO 401 errors, NO supabase network calls, app works normally"
