import React, { useEffect, useRef } from 'react';

const CameraPreview = ({ onPermissionDenied }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const getPermissions = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                videoRef.current.srcObject = stream;
            } catch (error) {
                onPermissionDenied();
            }
        };

        getPermissions();
    }, [onPermissionDenied]);

    return (
        <div className="camera-preview w-1/6 fixed right-0 z-10">
            <h3>Camera Preview</h3>
            <video className='rounded' ref={videoRef} autoPlay />
        </div>
    );
};

export default CameraPreview;