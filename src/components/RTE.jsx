import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'

function RTE({name, control, label, defaultValue = ''}) {
  const theme = useSelector((state) => state.theme.mode)

  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      <Controller
      name={name || 'content'}
      control={control}
      render={({field: { onChange }}) => (
        <Editor 
        apiKey='a6a44h0gd3n6852eeajhezs6g4siof0er3h63hthma9cja54'
        initialValue={defaultValue}
        init={{
            skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
            content_style: theme === 'dark' 
              ? 'body { background-color: #4B5563; border-color: #4B5563; color: white; font-family: Helvetica, Arial, sans-serif; font-size: 14px; }' 
              : 'body { background-color: white; color: black; font-family: Helvetica, Arial, sans-serif; font-size: 14px; }',
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                'image',
                'advlist',
                'autolink',
                'lists',
                'link',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'help',
                'wordcount',
            ],
            toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
        }}
        onEditorChange={onChange}
        />
      )}
      />
    </div>
  )
}

export default RTE
