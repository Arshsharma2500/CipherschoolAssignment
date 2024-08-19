import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import CameraPreview from './CameraPreview';

const TestEnvironment = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { testid } = useParams();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axiosInstance.get(`/api/questions/test/${testid}`);
                // console.log(response.data);
                setQuestions(response.data); // Assuming API response structure { questions: [...] }
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch questions:", err);
                setError("Failed to load questions. Please try again.");
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [testid]);

    const handleOptionChange = (id, answer) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, answer } : q));
    };

    const handleSubmit = () => {
        // Submit the answers to backend
        navigate('/finish-test');
    };

    const handlePermissionDenied = () => {
        alert("Camera and microphone permissions are required!");
        navigate('/');
    };

    if (loading) return <p>Loading questions...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="test-environment">
            <CameraPreview onPermissionDenied={handlePermissionDenied} />
            <div className="questions">
                {questions.map(q => (
                    <div key={q.id} className="question">
                        <h4>{q.question}</h4>
                        {q.options.map(option => (
                            <label key={option}>
                                <input
                                    type="radio"
                                    name={`question-${q.id}`}  // Unique name for each question
                                    value={option}
                                    checked={q.answer === option}
                                    onChange={() => handleOptionChange(q.id, option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Submit Test</button>
        </div>
    );
};

export default TestEnvironment;
