"use client";

import { Check } from 'lucide-react';
import { useState } from 'react';

const RadioOption = ({ label, checked, onClick }: { label: string, checked?: boolean, onClick?: () => void }) => (
  <label className="flex items-center cursor-pointer mb-2" onClick={(e) => { e.preventDefault(); onClick?.(); }}>
    <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center mr-2 shrink-0 transition-colors ${checked ? 'bg-[#605ca8] text-white' : 'border-[1.5px] border-gray-300'}`}>
      {checked && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
    </div>
    <span className={`text-[14px] ${checked ? 'text-[#3c8dbc]' : 'text-gray-600'}`}>{label}</span>
  </label>
);

const ThemeBox = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] mb-4">
    <div className="px-5 py-3 border-b border-[#f4f4f4]">
      <h3 className="text-[#3c8dbc] text-[16px] font-normal">{title}</h3>
    </div>
    <div className="p-5">
      {children}
    </div>
    <div className="px-5 py-3 border-t border-[#f4f4f4] flex justify-end bg-white rounded-b-[3px]">
      <button className="bg-[#0088cc] hover:bg-[#0077b3] text-white px-4 py-[7px] rounded-[3px] text-[13px] font-medium transition-colors">
        Save Changes
      </button>
    </div>
  </div>
);

export default function ThemePage() {
  const [navTemplate, setNavTemplate] = useState<'nav1' | 'nav2'>('nav1');
  const [displayMode, setDisplayMode] = useState<'fill' | 'fit'>('fill');
  const [featuredCat, setFeaturedCat] = useState<'grid' | 'round'>('round');

  return (
    <div>
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-[24px] text-gray-700 font-normal">Theme</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Left Column */}
        <div className="flex flex-col">
          
          {/* Navigation Box */}
          <ThemeBox title="Navigation">
            <div className="mb-5">
              <label className="block text-[14px] text-gray-700 mb-1.5 font-medium">Menu Limit (The number of links that appear in the menu)</label>
              <input 
                type="number" 
                defaultValue="8" 
                className="w-full border border-gray-300 rounded-[3px] px-3 py-[7px] text-[14px] text-gray-700 focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>
            
            <div>
              <label className="block text-[14px] text-[#3c8dbc] mb-3 font-normal">Navigation Template</label>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <RadioOption label="Navigation 1" checked={navTemplate === 'nav1'} onClick={() => setNavTemplate('nav1')} />
                  <div className="mt-2 border border-gray-200 rounded p-2 cursor-pointer bg-white" onClick={() => setNavTemplate('nav1')}>
                    {/* Navigation 1 Mockup */}
                    <div className="flex flex-col w-full h-[60px] border border-gray-100 shadow-sm rounded-sm overflow-hidden bg-white">
                      {/* Top Bar */}
                      <div className="h-[12px] bg-gray-50 flex justify-between items-center px-2 border-b border-gray-100">
                        <div className="flex gap-2">
                          <div className="w-10 h-1 bg-gray-200 rounded-full"></div>
                          <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
                          <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
                          <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
                        </div>
                      </div>
                      {/* Main Header */}
                      <div className="flex-1 flex items-center justify-between px-2">
                        <div className="font-bold text-[10px] text-gray-800">Modesy</div>
                        <div className="flex-1 px-4 flex items-center">
                          <div className="h-[14px] w-full border border-gray-200 rounded-sm flex items-center bg-gray-50">
                            <div className="w-10 h-full border-r border-gray-200 bg-gray-100"></div>
                            <div className="flex-1"></div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center">
                          <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                          <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                          <div className="w-8 h-[14px] bg-gray-800 rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <RadioOption label="Navigation 2" checked={navTemplate === 'nav2'} onClick={() => setNavTemplate('nav2')} />
                  <div className="mt-2 border border-gray-200 rounded p-2 cursor-pointer bg-white" onClick={() => setNavTemplate('nav2')}>
                    {/* Navigation 2 Mockup */}
                    <div className="flex flex-col w-full h-[60px] border border-gray-100 shadow-sm rounded-sm overflow-hidden bg-white">
                      {/* Top Bar */}
                      <div className="h-[10px] bg-gray-50 flex justify-between items-center px-2 border-b border-gray-100">
                        <div className="w-10 h-1 bg-gray-200 rounded-full"></div>
                        <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
                      </div>
                      {/* Main Header */}
                      <div className="h-[25px] flex items-center justify-between px-2 border-b border-gray-100">
                        <div className="font-bold text-[10px] text-gray-800">Modesy</div>
                        <div className="flex-1 px-2 flex items-center">
                          <div className="h-[12px] w-full border border-gray-200 rounded-sm bg-gray-50"></div>
                        </div>
                        <div className="flex gap-1 items-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                          <div className="w-8 h-[12px] bg-gray-800 rounded-sm"></div>
                        </div>
                      </div>
                      {/* Nav Links Row */}
                      <div className="flex-1 flex items-center px-2 gap-2 bg-white">
                        <div className="w-6 h-1 bg-gray-300 rounded-full"></div>
                        <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
                        <div className="w-10 h-1 bg-gray-200 rounded-full"></div>
                        <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
                        <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ThemeBox>

          {/* Product Image Display Mode Box */}
          <ThemeBox title="Product Image Display Mode">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <RadioOption label="Fill Container (Crop to Fit)" checked={displayMode === 'fill'} onClick={() => setDisplayMode('fill')} />
                <div className="mt-3 border border-[#f4f4f4] rounded shadow-sm w-[200px] cursor-pointer" onClick={() => setDisplayMode('fill')}>
                  <div className="w-full h-[180px] bg-[#e9ecef]"></div>
                  <div className="p-3">
                    <p className="text-[13px] font-semibold text-gray-800 mb-0.5">Test product</p>
                    <p className="text-[11px] text-gray-500 mb-2">Admin</p>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex text-[#d2d6de]">
                        {[...Array(5)].map((_, idx) => (
                          <svg key={idx} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        ))}
                      </div>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    </div>
                    <p className="text-[14px] font-bold text-gray-800">$45</p>
                  </div>
                </div>
              </div>
              <div>
                <RadioOption label="Show Full Image (Fit Inside)" checked={displayMode === 'fit'} onClick={() => setDisplayMode('fit')} />
                <div className="mt-3 border border-[#f4f4f4] rounded shadow-sm w-[200px] cursor-pointer" onClick={() => setDisplayMode('fit')}>
                  <div className="w-full h-[180px] bg-white flex items-center justify-center border-b border-[#f4f4f4]">
                    <div className="w-[120px] h-[120px] bg-[#e9ecef]"></div>
                  </div>
                  <div className="p-3">
                    <p className="text-[13px] font-semibold text-gray-800 mb-0.5">Test product</p>
                    <p className="text-[11px] text-gray-500 mb-2">Admin</p>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex text-[#d2d6de]">
                        {[...Array(5)].map((_, idx) => (
                          <svg key={idx} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        ))}
                      </div>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    </div>
                    <p className="text-[14px] font-bold text-gray-800">$45</p>
                  </div>
                </div>
              </div>
            </div>
          </ThemeBox>
        </div>

        {/* Right Column */}
        <div className="flex flex-col">
          
          {/* Featured Categories Box */}
          <ThemeBox title="Featured Categories">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <RadioOption label="Grid Layout" checked={featuredCat === 'grid'} onClick={() => setFeaturedCat('grid')} />
                <div className="mt-3 border border-gray-200 rounded p-2 flex gap-1 h-[140px] cursor-pointer" onClick={() => setFeaturedCat('grid')}>
                   <div className="w-1/2 flex flex-col gap-1">
                     <div className="flex-1 bg-gray-100 relative"><span className="absolute bottom-2 left-2 text-[8px] bg-gray-400 text-white px-1">Category</span></div>
                     <div className="flex-1 bg-gray-100 relative"><span className="absolute bottom-2 left-2 text-[8px] bg-gray-400 text-white px-1">Category</span></div>
                   </div>
                   <div className="w-1/2 flex flex-col gap-1">
                     <div className="h-1/3 bg-gray-100 relative"><span className="absolute bottom-2 left-2 text-[8px] bg-gray-400 text-white px-1">Category</span></div>
                     <div className="flex-1 bg-gray-100 relative"><span className="absolute bottom-2 left-2 text-[8px] bg-gray-400 text-white px-1">Category</span></div>
                   </div>
                </div>
              </div>
              <div>
                <RadioOption label="Round Boxes" checked={featuredCat === 'round'} onClick={() => setFeaturedCat('round')} />
                <div className="mt-3 border border-gray-200 rounded p-4 flex flex-wrap gap-2 h-[140px] items-start justify-between cursor-pointer" onClick={() => setFeaturedCat('round')}>
                   {[...Array(12)].map((_, i) => (
                     <div key={i} className="flex flex-col items-center">
                       <div className="w-8 h-8 rounded-full bg-gray-100 mb-1"></div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </ThemeBox>

        </div>
      </div>
    </div>
  );
}
