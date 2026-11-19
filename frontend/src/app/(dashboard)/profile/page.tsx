"use client";

import Navbar from "../../../components/shared/Navbar";
import { 
  User, Settings, Bell, Shield, CreditCard, 
  UploadCloud, Mail, MapPin, Briefcase, Github, 
  Linkedin, BadgeCheck, Cloud
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* ========================================== */}
        {/* LEFT SIDEBAR: PROFILE NAVIGATION           */}
        {/* ========================================== */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-2">
          <div className="mb-6 px-3">
            <h2 className="text-[13px] font-extrabold text-slate-900 uppercase tracking-wider">Settings</h2>
          </div>
          
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold transition-colors">
              <User className="h-4 w-4" /> Public Profile
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg text-sm font-bold transition-colors">
              <Settings className="h-4 w-4" /> Account
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg text-sm font-bold transition-colors">
              <Shield className="h-4 w-4" /> Security
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg text-sm font-bold transition-colors">
              <Bell className="h-4 w-4" /> Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg text-sm font-bold transition-colors">
              <CreditCard className="h-4 w-4" /> Subscription
            </button>
          </nav>
        </aside>

        {/* ========================================== */}
        {/* RIGHT AREA: PROFILE SETTINGS FORM          */}
        {/* ========================================== */}
        <div className="flex-1 space-y-6">
          
          {/* Profile Header Card */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
              <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-2">
                <UploadCloud className="h-4 w-4" /> Change Cover
              </button>
            </div>
            
            <div className="px-8 pb-8 relative">
              <div className="flex justify-between items-end mb-6">
                <div className="-mt-12 relative group cursor-pointer">
                  <div className="h-24 w-24 rounded-2xl bg-white p-1.5 shadow-lg border border-slate-100">
                    <div className="h-full w-full rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden relative">
                       {/* Placeholder Avatar */}
                       <User className="h-10 w-10 text-slate-400" />
                       <div className="absolute inset-0 bg-slate-900/40 hidden group-hover:flex items-center justify-center backdrop-blur-sm transition-all">
                         <UploadCloud className="h-5 w-5 text-white" />
                       </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-5 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors">Cancel</button>
                  <button className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors">Save Changes</button>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 mb-2">First Name</label>
                  <input type="text" defaultValue="Ishan" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 mb-2">Last Name</label>
                  <input type="text" defaultValue="Developer" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[13px] font-extrabold text-slate-700 mb-2">Professional Headline</label>
                  <input type="text" defaultValue="Founder @ NARMAHI | Full Stack Developer (React.js & Express.js)" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="email" defaultValue="ishan@narmahi.com" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-blue-500 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="text" defaultValue="Rajasthan, India" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-blue-500 outline-none transition-all" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[13px] font-extrabold text-slate-700 mb-2">Bio / About Me</label>
                  <textarea rows={4} defaultValue="Tech entrepreneur and full-stack developer passionate about building scalable digital solutions. Currently leading agency operations, developing LocalRank and Asseta platforms, and actively preparing for Microsoft AZ-204 certification to master cloud infrastructure." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles & Skills */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-6 border-b border-slate-100 pb-4">Social & Technical Profile</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 mb-2 flex items-center gap-2"><Github className="h-4 w-4" /> GitHub URL</label>
                <input type="text" defaultValue="github.com/ishan" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 mb-2 flex items-center gap-2"><Linkedin className="h-4 w-4 text-blue-600" /> LinkedIn URL</label>
                <input type="text" defaultValue="linkedin.com/in/ishan" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 mb-3 flex items-center gap-2"><Briefcase className="h-4 w-4 text-orange-500" /> Top Skills & Tech Stack</label>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-extrabold flex items-center gap-1">React.js <span className="text-slate-400 cursor-pointer ml-1 hover:text-rose-500">×</span></span>
                <span className="px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-extrabold flex items-center gap-1">Express.js <span className="text-slate-400 cursor-pointer ml-1 hover:text-rose-500">×</span></span>
                <span className="px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-extrabold flex items-center gap-1">MongoDB <span className="text-slate-400 cursor-pointer ml-1 hover:text-rose-500">×</span></span>
                <span className="px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-extrabold flex items-center gap-1">Tailwind CSS <span className="text-slate-400 cursor-pointer ml-1 hover:text-rose-500">×</span></span>
                <span className="px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-xs font-extrabold flex items-center gap-1"><Cloud className="h-3 w-3"/> AZ-204 Prep <span className="text-blue-400 cursor-pointer ml-1 hover:text-rose-500">×</span></span>
                <button className="px-3 py-1.5 bg-white border border-dashed border-slate-300 text-slate-500 rounded-lg text-xs font-extrabold hover:text-blue-600 hover:border-blue-300 transition-colors">
                  + Add Skill
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}