import React, { useState } from 'react'
import { Edit, Plus, Trash } from '../Icons'

export default function FAQ() {
    const [openEditBox, setOpenEditBox] = useState(false);
    const [addQuestion, setAddQuestion] = useState(false);
    return (
        <div className='generative-landing-inner-faq'>
            <div className='generative-landing-inner-faq-title'>
                <span>FAQ</span>
            </div>
            <div className='generative-landing-inner-faq-content m-t-20'>
                <div className='generative-landing-inner-faq-content-oneblock'>
                    <span>When is the mint Date?</span>
                    <div className='generative-landing-inner-faq-content-oneblock-right'>
                        <div><Trash /></div>
                        <div onClick={() => setOpenEditBox(!openEditBox)}><Edit /></div>
                        <span>EDIT</span>
                    </div>
                </div>
                {openEditBox ?
                    <div className='generative-landing-inner-faq-content-oneblock-inputs m-t-20'>
                        <div className="mediaeyeform-group-input m-b-30">
                            <input
                                className="mediaeyeform-input"
                                type="text"
                                placeholder='Name'
                            />
                        </div>
                        <div className="mediaeyetextarea">
                            <textarea
                                className="mediaeyetextarea-input"
                                rows="5"
                                placeholder='Description'
                            ></textarea>
                        </div>
                        <div className='text-right m-t-10'>
                            <button className='btn btn-square btn-gaming'>Save</button>
                        </div>
                    </div>
                    : null
                }
                <div className='generative-landing-inner-faq-content-addnew m-t-20' onClick={() => setAddQuestion(!addQuestion)}>
                    <Plus />
                    <span className='text-semitransperant '>Add Question</span>
                </div>
                {addQuestion ?
                    <div className='generative-landing-inner-faq-content-oneblock-inputs m-t-20'>
                        <div className="mediaeyeform-group-input m-b-30">
                            <input
                                className="mediaeyeform-input"
                                type="text"
                                placeholder='Name'
                            />
                        </div>
                        <div className="mediaeyetextarea">
                            <textarea
                                className="mediaeyetextarea-input"
                                rows="5"
                                placeholder='Description'
                            ></textarea>
                        </div>
                        <div className='text-right m-t-10'>
                            <button className='btn btn-square btn-gaming'>Save</button>
                        </div>
                    </div>
                    : null
                }
            </div>

        </div>
    )
}
