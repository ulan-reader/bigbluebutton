import React from 'react';
import { injectIntl } from 'react-intl';
import RaiseHandButton from './component';
import Auth from '/imports/ui/services/auth';
import useCurrentUser from '/imports/ui/core/hooks/useCurrentUser';
import SubtitlesButton from './component';


const SubtitlesButtonContainer = ({ amIModerator, ...props }) => {
    const { data: currentUserData } = useCurrentUser();

    const currentUser = {
        userId: Auth.userID,
    };

    return (
        <SubtitlesButton {...{
            ...currentUser,
            amIModerator,
            ...props,
        }}
        />
    );
};

export default injectIntl(SubtitlesButtonContainer);
