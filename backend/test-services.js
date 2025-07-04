
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

const testEndpoints = [
  { name: 'Housing API', url: `${BASE_URL}/api/properties` },
  { name: 'Parttime Jobs', url: `${BASE_URL}/api/parttime/jobs` },
  { name: 'Rental Items', url: `${BASE_URL}/api/rental/items` },
  { name: 'Food Restaurants', url: `${BASE_URL}/api/food/restaurants` },
  { name: 'Events', url: `${BASE_URL}/events` },
  { name: 'Categories', url: `${BASE_URL}/api/rental/categories` }
];

async function testAllServices() {
  console.log('🚀 Testing all unified backend services...\n');
  
  for (const endpoint of testEndpoints) {
    try {
      const response = await fetch(endpoint.url);
      const status = response.ok ? '✅' : '❌';
      console.log(`${status} ${endpoint.name}: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.log(`❌ ${endpoint.name}: Connection failed - ${error.message}`);
    }
  }
  
  console.log('\n🎉 Service testing completed!');
}

// Run tests after a short delay to allow server startup
setTimeout(testAllServices, 3000);ices, 5000);
