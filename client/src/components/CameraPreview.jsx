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
        <div className="camera-preview">
            <h3>Camera Preview</h3>
            <video ref={videoRef} autoPlay />
        </div>
    );
};

export default CameraPreview;