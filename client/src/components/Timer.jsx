import React, { useState, useEffect } from 'react';

const Timer = ({ initialMinutes = 45, initialSeconds = 0, onTimeUp }) => {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(countdown);
                    if (onTimeUp) {
                        onTimeUp();
                    }
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [minutes, seconds, onTimeUp]);

    return (
        <div className="timer">
            <p>Time Left</p>
            <p>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
        </div>
    );
};

export default Timer;
