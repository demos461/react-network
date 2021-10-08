import React, {Component} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {getUserProfile, UserProfileType} from '../../redux/reducers/profile-reducer';
import Preloader from '../Preloader/Preloader';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {WithAuthRedirect} from '../../hoc/withAuthRedirect';

type PathParamsType = {
    userId: string
}

type MapStateToPropsType = {
    profile: UserProfileType,
    isAuth: boolean
}

type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
}

type PropsType = MapDispatchToPropsType & MapStateToPropsType
type ProfileContainerProps = RouteComponentProps<PathParamsType> & PropsType

class ProfileContainer extends Component<ProfileContainerProps> {
    componentDidMount() {
        let userId = +this.props.match.params.userId
        if (!userId) userId = 19600
        this.props.getUserProfile(userId)

    }


    render() {
        return (
            this.props.profile
                ? <Profile profile={this.props.profile}/>
                : <Preloader/>
        );
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
}

const ProfileContainerWithRouter = withRouter(ProfileContainer)

export default WithAuthRedirect(connect(mapStateToProps, {getUserProfile})(ProfileContainerWithRouter));