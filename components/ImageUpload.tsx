import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface ImageUploadProps {
    onChange: (base64: string) => void;
    label: string;
    value?: string;
    disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    label,
    value,
    disabled
}) => {
    const [base64, setBase64] = useState(value);

    const handleChange = useCallback((base64: string) => {
        onChange(base64);
    }, [onChange]);


    const handleDrop = useCallback((files: any) => {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (event: any) => {
            setBase64(event.target.result);
            handleChange(event.target.result);
        }

        reader.readAsDataURL(file);
    }, [handleChange]);

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled: disabled,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        }
    });

    return (
        <div {...getRootProps({
            className: "w-fill p-4 text-white text-center boerder-2 border-dotted rounded-md border-neutral-700"
        })}>
            <input {...getInputProps()} />
            {
                base64 ? (
                    <div className="flex items-center justify-center">
                        <Image
                            src={base64}
                            height="100"
                            width="100"
                            alt="Uploaded image"
                        />
                    </div>
                ) : (
                    <p className="text-white">{label}</p>
                )
            }
        </div>
    )
}

export default ImageUpload;