import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import CameraPreview from './CameraPreview';
import Timer from './Timer';
import './TestEnvironment.css'; 

const TestEnvironment = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [totalmarks, setTotalMarks] = useState(0);
    const navigate = useNavigate();
    const { testid } = useParams();
    
    //fetch question by testid
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axiosInstance.get(`/api/questions/test/${testid}`);
                setQuestions(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch questions:", err);
                setError("Failed to load questions. Please try again.");
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [testid]);

    const handleOptionChange = (questionId, selectedOption) => {
        setAnswers({
            ...answers,
            [questionId]: selectedOption,
        });
    };

    const handleSubmit = () => {
        // Submit the answers to backend
        navigate('/finish-test');
    };

    const handlePermissionDenied = () => {
        alert("Camera and microphone permissions are required!");
        navigate('/');
    };

    const handleQuestionSelect = (index) => {
        setSelectedQuestionIndex(index);
    };
    // handle for next question
    const handleNext = () => {
        const nextIndex = Math.min(selectedQuestionIndex + 1, questions.length - 1);
        setSelectedQuestionIndex(nextIndex);

        // If the current question is answered, mark it as green
        const currentQuestionId = questions[selectedQuestionIndex]._id;
        if (answers[currentQuestionId]) {
            document.getElementById(`question-${selectedQuestionIndex + 1}`).style.backgroundColor = 'green';
        }

    };

    // handle reviw question
    const handlereview = () => {
        const currIndex = Math.min(selectedQuestionIndex + 1, questions.length - 1);
        setSelectedQuestionIndex(currIndex);

        //If the current question is reviewed, mart it as maroon
        const currentQuestionId = questions[selectedQuestionIndex]._id;
        if(answers[currentQuestionId]){
            document.getElementById(`question-${selectedQuestionIndex + 1}`).style.backgroundColor = '#dc3545';
        }
    }

    //Handle Timer
    const handleTimeUp = () => {
        alert('Time is up! Submitting the test.');
        navigate('/finish-test');
    }
    
    //Handle Marks
    useEffect(() =>{

    })

    if (loading) return <p>Loading questions...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="test-environment-container">
            <CameraPreview onPermissionDenied={handlePermissionDenied} />
            <div className="test-header">
                <h2>Online Test - CipherSchool</h2>
            </div>
            <div className="test-body">
                <div className="sidebar">
                <Timer initialMinutes={45} initialSeconds={0} onTimeUp={handleTimeUp} />
                    <div className="question-nav">
                        <h3>Dummy Test</h3>
                        <div className="question-list">
                            {questions.map((q, index) => (
                                <button
                                    key={q._id}
                                    id={`question-${index + 1}`} // Add an ID for easier access
                                    className={`question-number ${index === selectedQuestionIndex ? 'selected' : ''}`}
                                    onClick={() => handleQuestionSelect(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        {/* <h3>Verbal</h3>
                        Add similar structure for verbal questions if applicable */}
                    </div>
                </div>
                <div className="question-panel flex flex-col justify-between">
                    <div className="question flex flex-col gap-2">
                        <h4 className='text-black text-lg font-serif font-medium'>{selectedQuestionIndex+1}. {questions[selectedQuestionIndex].question}</h4>
                        {questions[selectedQuestionIndex].options.map(option => (
                            <label key={option} className='text-black font-serif'>
                                <input className='mr-3'
                                    type="radio"
                                    name={`question-${questions[selectedQuestionIndex]._id}`}
                                    value={option}
                                    checked={answers[questions[selectedQuestionIndex]._id] === option}
                                    onChange={() => handleOptionChange(questions[selectedQuestionIndex]._id, option)}
                                />
                                {option} 
                            </label>
                        ))}
                    </div>
                    <div className="question-actions">
                        <button className="mark-review" onClick={handlereview}>Mark for review</button>
                        <button
                            className="previous"
                            onClick={() => handleQuestionSelect(Math.max(selectedQuestionIndex - 1, 0))}
                        >
                            Previous
                        </button>
                        <button
                            className="next"
                            onClick={handleNext} // Updated to use handleNext
                        >
                            Next
                        </button>
                        <button className="submit-test" onClick={handleSubmit}>Submit Test</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestEnvironment;
