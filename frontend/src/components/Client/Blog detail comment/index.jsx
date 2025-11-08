import React from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import moment from 'moment';
import { Flag } from 'lucide-react';

export default function BlogDetailComment({ setReportedUser, handleOpenReportModal, comment, users, avatars, allFrame, userInfo, toggleMenu, openCommentId, deleteOwnComment, handleOpen, setEditComment, navigate }) {
    const commentUser = users?.find((user) => user.id == comment?.authorId);
    const commentAvatar = avatars?.find((avatar) => avatar.id == commentUser?.avatarId);
    const formattedDate = comment?.createdAt.split('.')[0];

    return (
        <div className="mt-4 flex gap-2">
            <div onClick={(e) => navigate(`/user/${commentUser?.userName}`, e.stopPropagation())} className='relative flex items-center justify-center w-[45px] h-[45px] flex-shrink-0 cursor-pointer'>
                <img className='w-[75%] h-[75%] rounded-full object-cover z-0 object-center' src={`https://englishwithmovies.blob.core.windows.net/avatar/${commentAvatar?.imgName}`} alt="profile" />
                {
                    commentUser?.userFrames &&
                    commentUser?.userFrames.map((frame) => {
                        if (frame.isCurrent) {
                            let userFrame = allFrame?.find((value) => value.id == frame.frameId);
                            return (
                                <div
                                    key={frame.frameId}
                                    className="absolute w-full h-full bg-cover bg-center z-10"
                                    style={{ backgroundImage: `url('https://englishwithmovies.blob.core.windows.net/frame/${userFrame?.imgName}')` }}
                                ></div>
                            );
                        }
                        return null;
                    })
                }
            </div>
            <div className="w-full">
                <div className="flex justify-between items-center">
                    <div className="text-sm opacity-85">{commentUser?.userName} {moment.utc(formattedDate).local().format('DD MMM YYYY HH:mm')}</div>
                    <div className="relative">
                        <div onClick={() => toggleMenu(comment.id)} className="cursor-pointer"><HiDotsVertical /></div>
                        {openCommentId === comment.id && (
                            <div className="text-white bg-[#537296] p-1 rounded absolute top-0 right-4 w-[120px]">
                                {
                                    comment.authorId == userInfo?.userId ? (
                                        <>
                                            <div onClick={() => deleteOwnComment(comment.id)} className="font-['Kanit'] cursor-pointer">Sil</div>
                                            <div className="w-full h-[1px] bg-gray-400"></div>
                                            <div onClick={() => { handleOpen(), setEditComment(comment) }} className="font-['Kanit'] cursor-pointer">Redaktə et</div>
                                        </>
                                    ) : (
                                        <div onClick={() => { handleOpenReportModal(); setReportedUser(comment?.authorId) }} className="font-['Kanit'] gap-2 flex items-center cursor-pointer"><Flag /> Şikayət et</div>
                                    )
                                }
                            </div>
                        )}
                    </div>
                </div>
                <div className="break-all text-sm sm:text-md">{comment.content}</div>
            </div>
        </div>
    )
}