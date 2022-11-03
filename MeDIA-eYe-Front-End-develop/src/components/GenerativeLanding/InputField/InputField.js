import React, { useState } from 'react'
import { size } from 'underscore';
import { MinusCloseIcon, Refresh, RightSideArrow, Upload } from '../../Icons'
import './InputField.scss'

export default function InputField(props) {
    const { size, mainImage } = props;
    const [upload, setUpload] = useState();
    const [value, setValue] = useState(props.mainImage)
    const handleImageUpload = (e) => {
        if (e.target.files) {
            setUpload(e.target.files)
        }
    }
    return (
        <div className='InputField'>
            <input type="file" className='InputField-input' onChange={handleImageUpload} />
            {
                upload ? null :

                    <div className='InputField-text'>
                        <div className='InputField-text-icon'><Upload upload={'arrowWithLine'} /></div>
                        <div className='InputField-text-choosetext'>Choose file</div>
                        <div className='text-semitransperant'>{size ? size : "Size 580x580px"}</div>
                    </div>
            }
            {
                upload ?
                    <div className='InputField-image'>
                        <img className='' src={URL.createObjectURL(upload?.[0])} />
                    </div>
                    :
                    null
            }
            {
                upload ?
                    <div className='InputField-refresh'>
                        <Refresh />
                        <input type="file" onChange={handleImageUpload} />
                    </div>
                    : null
            }

        </div>
    )
}
