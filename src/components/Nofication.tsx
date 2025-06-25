import React, { useState } from 'react';
import Switch from './common/Switch';

interface Preferences {
    platformNotifications: boolean;
    emailNotifications: boolean;
    website1: boolean;
    website2: boolean;
    [key: string]: boolean;  
}

const Notification: React.FC = () => {
    const [preferences, setPreferences] = useState<Preferences>({
        platformNotifications: true,
        emailNotifications: true,
        website1: true,
        website2: true
    });

    const handleToggle = (key: keyof Preferences) => {
        setPreferences(prev => ({
        ...prev,
        [key]: !prev[key]
        }));
    };

  return (
    <div className="max-w-2xl flex h-fit gap-6 flex-wrap">
      {/* Notification Choices Section */}
      <div className="border rounded-lg p-6 w-full">
        <h2 className="text-lg font-medium text-primary mb-4">Tuỳ chọn thông báo</h2> 
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Nhận thông báo trên</span>
            <Switch 
              checked={preferences.platformNotifications}
              onToggle={() => handleToggle('platformNotifications')}
            /> 
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Nhận thông báo qua email</span>
            <Switch
              checked={preferences.emailNotifications}
              onToggle={() => handleToggle('emailNotifications')}
            /> 
          </div>
        </div>
      </div>

      {/* Website Notifications Section */}
      <div className="border rounded-lg p-6 w-full">
        <h2 className="text-lg font-medium text-primary mb-4">Thông báo website</h2> 
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Thiệp cưới online</div>
              <div className="text-xs text-gray-500">https://thiepcuoionline.huythanhjewelry.vn</div>
            </div>
            <Switch 
              checked={preferences.website1}
              onToggle={() => handleToggle('website1')}
            /> 
          </div> 
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Thiệp cưới online</div>
              <div className="text-xs text-gray-500">https://thiepcuoionline.huythanhjewelry.vn</div>
            </div>
            <Switch
              checked={preferences.website2}
              onToggle={() => handleToggle('website2')}
            /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;