import useEditModal from "@/hooks/useEditModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModal = useEditModal();

    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
    }, [currentUser]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.patch('/api/edit', {         // ini yang bikin gabisa ubah profile (404)
                name,
                username,
                bio,
                profileImage,
                coverImage
            });
            mutateFetchedUser();

            toast.success('Profile updated successfully');
            editModal.onClose();
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [name, username, bio, profileImage, coverImage, mutateFetchedUser, editModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload
                value={profileImage}
                onChange={(image) => setProfileImage(image)}
                disabled={isLoading}
                label="Upload profile image"
            />
            <ImageUpload
                value={coverImage}
                onChange={(image) => setCoverImage(image)}
                disabled={isLoading}
                label="Upload cover image"
            />
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title="Edit Profile"
            actionLabel="Save"
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    )
}

export default EditModal;