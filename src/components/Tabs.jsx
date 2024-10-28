import React, { useState, useEffect } from 'react';
import { fetchTabData } from '../utils/fetchData';
import SkeletonLoading from './skeletonLoading';
import ToastError from './toastError';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [tabData, setTabData] = useState(null);
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const tabs = [1, 2, 3, 4];

    useEffect(() => {
        const loadTabData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchTabData(activeTab);
                setTabData(data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadTabData();
    }, [activeTab]);

    return (
        <div className="container">
              {error && <ToastError message={error} onClose={() => setError(null)} />}
            <div className="tabs">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {`Tab ${tab}`}
                    </button>
                ))}
            </div>
            
            <div className={`tab-content  active`}>
                <h2 className='title'>{tabData?.title}</h2>
                {loading ? (
                    <SkeletonLoading />
                ): (
                    <p>{tabData?.content}</p>
                )}
            </div>
           
        </div>
    );
};

export default Tabs;
