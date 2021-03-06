import React, { FC, memo } from 'react';
import s from '../../../styles/ProfileInfo.module.css';
import { ReactComponent as UserIcon } from 'assets/images/user.svg';
import ProfileStatus from './ProfileStatus';
import { Contact } from './Contact';
import { UserProfileType } from '../../../redux/reducers/profile-reducer';

type ProfileDataProps = {
  profile: UserProfileType;
  status: string;
  onEditModeClick: (bool: boolean) => void;
  isOwner: boolean;
  updateUserStatus: (status: string) => void;
};

const ProfileData: FC<ProfileDataProps> = memo(
  ({ profile, status, onEditModeClick, isOwner, updateUserStatus }) => {
    return (
      <div className={s.profileInfo}>
        <div className={s.avatar}>
          {profile.photos.small ? (
            <img src={profile.photos.small} alt="avatar" />
          ) : (
            <UserIcon />
          )}

          {profile.lookingForAJob && (
            <div className={s.lookingForAJob}>Looking For A Job!</div>
          )}
          {profile.lookingForAJobDescription && (
            <div className={s.lookingForAJobDescription}>
              {profile.lookingForAJobDescription}
            </div>
          )}
          {isOwner && <button onClick={() => onEditModeClick(true)}>Edit profile</button>}
        </div>
        <div>
          <div className={s.fullName}>{profile.fullName}</div>
          <ProfileStatus
            status={status}
            updateUserStatus={updateUserStatus}
            isOwner={isOwner}
          />
          <div className={s.descr}>
            <div>
              About me: <span>{profile.aboutMe}</span>
            </div>

            <div>Contacts:</div>
            {Object.keys(profile.contacts).map(key => (
              //@ts-ignore
              <Contact key={key} socialName={key} value={profile.contacts[key]} />
            ))}
          </div>
        </div>
      </div>
    );
  },
);

export default ProfileData;
