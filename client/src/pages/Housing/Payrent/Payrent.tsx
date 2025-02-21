import { useState } from 'react';
import {
  Shield,
  CreditCard,
  Tag,
  ChevronDown,
  ChevronRight,
  Zap,
  Banknote,
  Users,
  Building2,
  Clock,
  Receipt,
  PiggyBank,
  CreditCard as CardIcon,
  FileText,
  Wallet,
  CheckCircle
} from 'lucide-react';

function Payrent() {
  const [paymentType, setPaymentType] = useState('House Rent');

  return (
    <div className="min-h-screen bg-[#3949AB]">
      <div className="p-8 flex gap-8 items-start">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-white text-3xl font-bold mb-6">Pay Rent and Fees with Credit Card</h1>
          
          <div className="flex items-center gap-2 text-white mb-8">
            <Shield size={20} />
            <span>Lowest Charges. Instant Transfers.</span>
          </div>

          <div className="space-y-6">
            {/* Bachelor InstaCash */}
            <div className="bg-white p-4 rounded-lg flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <Banknote className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Bachelor InstaCash</h3>
                <p className="text-gray-600">Get Instant Cash Upto ₹10 Lakhs</p>
                <button className="text-blue-600 font-medium mt-1">Withdraw Now</button>
              </div>
            </div>

            {/* Renter's Club */}
            <div className="bg-white p-4 rounded-lg flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <Users className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Renter's Club</h3>
                <p className="text-gray-600">Get 50% Off on processing fees by inviting your friends</p>
              </div>
            </div>

            {/* Society Maintenance */}
            <div className="bg-white p-4 rounded-lg flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <Building2 className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Now pay Society Maintenance too</h3>
                <p className="text-gray-600">All your property payments at one place - rent, maintenance, deposit, token</p>
              </div>
            </div>

            {/* First Rewards Section */}
            <div className="bg-white p-4 rounded-lg flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <CreditCard className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Earn upto ₹10,000/- in Rewards</h3>
                <p className="text-gray-600">Earn miles and reward points on your Visa and Mastercard cards plus enjoy upto 45 days interest free credit period.</p>
              </div>
            </div>

            {/* Second Rewards Section */}
            <div className="bg-white p-4 rounded-lg flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <CardIcon className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Earn upto ₹30,000/- in Rewards</h3>
                <p className="text-gray-600">Earn miles, get cash back and reward points on every property payment with your card.</p>
              </div>
            </div>

            {/* Pay with Credit Card */}
            <div className="bg-white p-4 rounded-lg flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <CreditCard className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  Pay with Credit Card
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                </h3>
                <p className="text-gray-600">We accept major cards like Visa and Mastercard so your property payment is hassle free.</p>
              </div>
            </div>

            {/* Interest Free Period */}
            <div className="bg-white p-4 rounded-lg flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <Clock className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Enjoy 45 days interest free credit period</h3>
                <p className="text-gray-600">Depending on your card statement date</p>
              </div>
            </div>

            {/* Reach Milestones */}
            <div className="bg-white p-4 rounded-lg flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <PiggyBank className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Reach Milestones Faster</h3>
                <p className="text-gray-600">Earn rewards on those yearly spends with your credit card.</p>
              </div>
            </div>

            {/* Digital Receipts */}
            <div className="bg-white p-4 rounded-lg flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <Receipt className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Digital Receipts</h3>
                <p className="text-gray-600">Payment receipts are generated instantly and sent directly to your email ID. Claim your HRA with ease.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Payment Form */}
        <div className="w-[450px] bg-white rounded-lg p-6">
          {/* Offer Banner */}
          <div className="bg-green-50 p-4 rounded-lg mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 rounded-full p-2">
                <Tag size={20} className="text-red-500" />
              </div>
              <div>
                <p className="text-sm">Flat ₹100 off on Gift Vouchers on Rent Payment</p>
                <button className="text-sm text-blue-600">View All Offers</button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight size={20} className="text-gray-400" />
              <span className="text-xs text-white bg-green-600 px-2 py-0.5 rounded">Offer 1/1</span>
            </div>
          </div>

          {/* Payment Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
              <div className="relative">
                <select 
                  className="w-full p-2.5 border rounded-lg appearance-none pr-10"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  <option>School Fees</option>
                  <option>Maintenance</option>
                  <option>Deposit</option>
                </select>
                <ChevronDown size={20} className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input 
                type="text"
                placeholder="Enter your name"
                className="w-full p-2.5 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <div className="flex">
                <select className="border rounded-l-lg px-2 bg-gray-50">
                  <option>+91</option>
                </select>
                <input 
                  type="tel"
                  placeholder="Enter phone number"
                  className="flex-1 p-2.5 border border-l-0 rounded-r-lg"
                />
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <span>Get payment updates on</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="h-5 w-5" />
                <span>Whatsapp</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
              <input 
                type="email"
                placeholder="Enter email address"
                className="w-full p-2.5 border rounded-lg"
              />
            </div>

            <div className="flex items-start gap-2">
              <input 
                type="checkbox"
                id="terms"
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm">
                I agree to the Bachelors <span className="text-blue-600">Terms and Conditions</span>
              </label>
            </div>

            <button 
              className="w-full bg-pink-400 text-white py-3 rounded-lg font-medium hover:bg-pink-500 transition-colors"
            >
              Get Started
            </button>

            <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
              <Zap className="text-blue-600" size={20} />
              <p className="text-sm text-gray-600">Your payment will be transferred instantly to your landlord's account*</p>
            </div>
          </form>
        </div>
      </div>

      {/* New Section - Earn Money with Bachelors Pay */}
      <div className="px-8 py-12 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-2xl font-bold mb-2">Earn money with Bachelors Pay</h2>
        <p className="text-gray-600">Start paying rent using your credit card and earn miles, cashback and reward points.</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
        <Zap className="text-blue-600" size={24} />
        <p>You can earn up to ₹30,000* by just paying rent for a year by using your credit card.</p>
      </div>
    </div>

    <p className="text-xs text-gray-500 mt-8">*This is calculated assuming an annual rent of 4.5 Lakhs on a Club Vistara SBI Card PRIME (Premium)</p>

    <div className="flex justify-between items-center mt-16">
      <div className="text-center">
        <div className="bg-white p-4 rounded-lg shadow-md inline-block mb-6"> {/* Increased bottom margin */}
          <FileText className="text-blue-600" size={32} />
        </div>
        <div className="relative mb-6"> {/* Increased margin bottom */}
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">1</span>
        </div>
        <h3 className="font-semibold mb-2">Fill Transaction Detail</h3>
        <p className="text-gray-600 text-sm">Provide your beneficiary bank details, and we will setup your account.</p>
      </div>

      <div className="text-center">
        <div className="bg-white p-4 rounded-lg shadow-md inline-block mb-6"> {/* Increased bottom margin */}
          <Wallet className="text-blue-600" size={32} />
        </div>
        <div className="relative mb-6"> {/* Increased margin bottom */}
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">2</span>
        </div>
        <h3 className="font-semibold mb-2">Make Payment</h3>
        <p className="text-gray-600 text-sm">Make payment through your credit card or debit card.</p>
      </div>

      <div className="text-center">
        <div className="bg-white p-4 rounded-lg shadow-md inline-block mb-6"> {/* Increased bottom margin */}
          <CheckCircle className="text-blue-600" size={32} />
        </div>
        <div className="relative mb-6"> {/* Increased margin bottom */}
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">3</span>
        </div>
        <h3 className="font-semibold mb-2">Payment Credited!</h3>
        <p className="text-gray-600 text-sm">Your payment is credited to your beneficiary's bank account within 2 working days.</p>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}

export default Payrent;