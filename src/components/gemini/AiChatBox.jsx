import React, {useState, useEffect} from 'react'
import aiService from '../../gemini/gemini';
import {Button} from '../index';
import Spinner from '../Spinner';
import {Logo} from '../index';

function AiChatBox({title, onClose}) {
    const [response, setResponse] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        aiService.GeminiAi({
            content: `Write a detailed and engaging blog post based on this title:
                      ${title}
                      Requirements:
                      - Use simple and beginner-friendly language
                      - Add headings and subheadings
                      - Include an introduction and conclusion
                      - Make the content informative and readable
                      - Write at least 800 words`
        })
        .then((result) => {
            setResponse(result.text)
        })
        .catch((error) => {
            if(error.message.includes('429') || error.message.includes('Too Many Requests')) {
                setResponse('AI is currently busy. Please wait a moment and try again.')
            } else {
                setResponse('Something went wrong. Please try again.')
            }
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [])

    return (
        <div className='fixed inset-0 z-50 bg-black/30 flex justify-center items-center'>
            <div className='bg-white dark:bg-gray-900 rounded-xl max-w-lg w-full max-h-[80vh] flex flex-col relative mx-4'>
                
                {isLoading && (
                    <div className='absolute inset-0 z-[60] bg-white/80 dark:bg-gray-900 flex flex-col justify-center items-center rounded-xl cursor-not-allowed'>
                        <Spinner />
                        <p className='mt-2 text-gray-500 dark:text-gray-300 text-sm'>Generating...</p>
                    </div>
                )}

                <div className=' flex justify-center'>
                    {!isLoading && (
                        <span className='inline-block w-full max-w-[100px]'>
                            <Logo width='100%' />
                        </span>
                    )}
                </div>

                <div className='p-6 overflow-y-auto flex-1'>
                    <p className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap'>{response}</p>
                </div>

                
                <div className='p-4 border-t border-gray-100'>
                    {!isLoading && (
                        <Button 
                        className='w-full hover:bg-indigo-700 bg-indigo-600 text-white flex justify-center cursor-pointer' 
                        onClick={onClose}
                        >
                            Close
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AiChatBox