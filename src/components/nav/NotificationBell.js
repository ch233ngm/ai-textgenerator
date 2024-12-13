'use client';

import { BellIcon } from '@heroicons/react/24/outline';

export default function NotificationBell({ freeUseMessage }) {
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <BellIcon className="h-5 w-5" />
                    <span className="badge badge-sm indicator-item badge-secondary"></span>
                </div>
            </label>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                <div className="card-body">
                    <span className="font-bold text-lg">Notifications</span>
                    <span className="text-info">{freeUseMessage}</span>
                    <div className="card-actions">
                        <button className="btn btn-primary btn-block">View all</button>
                    </div>
                </div>
            </div>
        </div>
    );
}