import '../styles/NavbarStyles.css';
import SearchIcon from '@mui/icons-material/Search';
import MenuBar from '../svg/MenuBar';
import CancelButton from '../svg/CancelButton';
import Magnify from '../svg/Magnify';
import ProfileIcon from './ProfileIcon';
import UsernameHolder from './UsernameHolder';
import { useState, useRef, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = ({
    isCommunityClicked,
    isFriendsClicked,
    setIsCommunityClicked,
    setIsFriendsClicked,
    isSidebarClicked,
    setIsSidebarClicked,
}) => {
    const [searchBar, setSearchBar] = useState(false);
    const [searchUsernames, setSearchUsernames] = useState([]);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [pfp, setPfp] = useState(
        'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
    );
    const [searchInput, setSearchInput] = useState([]);
    const [userToPfp, setUserToPfp] = useState({});
    const inputRef = useRef(null);
    const { user } = useAuthContext();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const updateScreenWidth = () => {
        setScreenWidth(window.innerWidth);
      };

    const handleSearchClick = () => {
        if (!searchBar) {
            setRotationAngle(rotationAngle + 90);
            setTimeout(() => {
                setSearchBar(true);
            }, 200);
        }
        if (searchBar && inputRef.current) {
            inputRef.current.focus();
        }
    };

    const closeSearchClick = () => {
        if (searchBar) {
            setRotationAngle(rotationAngle - 90);
            setTimeout(() => {
                setSearchBar(false);
            }, 200);
        }
    };

    const handleCommunityButtonClick = () => {
        if (isFriendsClicked) {
            setIsCommunityClicked(!isCommunityClicked);
            setIsFriendsClicked(!isFriendsClicked);
        }
    };

    const handleFriendButtonClick = () => {
        if (isCommunityClicked) {
            setIsCommunityClicked(!isCommunityClicked);
            setIsFriendsClicked(!isFriendsClicked);
        }
    };

    const handleSideBarClick = () => {
        setIsSidebarClicked(!isSidebarClicked);
    };

    const handleSearchFocus = (event) => {
        // Clear the placeholder when the input is focused
        event.target.placeholder = '';
    };

    const handleSearchBlur = (event) => {
        // Restore the placeholder when the input is blurred
        event.target.placeholder = '🔍 Search...';
    };

    const handleSearchInputChange = (event) => {
        const currentInput = event.target.value.toLowerCase();

        // Filter searches by character
        const filteredUsernames = searchUsernames.filter((username) =>
            username.toLowerCase().includes(currentInput)
        );

        setSearchInput(filteredUsernames);
        if (event.target.value == '') setSearchInput([]);
    };

    const fetchPfp = async () => {
        const response = await fetch(
            process.env.REACT_APP_BACKEND + 'api/main/navbar/' + user.username,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer: ${user.idToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const json = await response.json();

        setUserToPfp(json.userToPfp);
        setSearchUsernames(json.usernames);
        setPfp(json.pfp);
    };

    useEffect(() => {
        fetchPfp();
        window.addEventListener("resize", updateScreenWidth);
        console.log("screen width: ",screenWidth)
        

        return () => {
            window.removeEventListener("resize", updateScreenWidth);
        };
    }, []);

    return (
        <div className="navbar">
            <h1 className="logo-name">ReaList</h1>

            <div className="two-buttons">
                <button
                    className={`community-button ${
                        isFriendsClicked ? 'clicked' : ''
                    }`}
                    onClick={handleFriendButtonClick}
                >
                    Following
                </button>

                <button
                    className={`community-button ${
                        isCommunityClicked ? 'clicked' : ''
                    }`}
                    onClick={handleCommunityButtonClick}
                >
                    Community
                </button>
            </div>

            <div className="right-side">
            {screenWidth > 770 && (
                <>
                {screenWidth > 1180 && (
                    <Magnify className="search-image" onClick={handleSearchClick} />
                )}

                {screenWidth > 1180 && searchBar && (
                    <div className="search-bar-container">
                    <div className="search-bar-and-menu-container">
                        <input
                        ref={inputRef}
                        className="search-bar"
                        type="text"
                        name=""
                        id=""
                        placeholder="Search..."
                        onChange={handleSearchInputChange}
                        />
                        {searchInput.length > 0 && (
                        <div className="search-results">
                            {searchInput.map((user) => (
                            <UsernameHolder
                                key={user} // Make sure to add a unique key prop
                                pfp={userToPfp[user]}
                                username={user}
                            />
                            ))}
                        </div>
                        )}
                    </div>
                    <CancelButton onClick={closeSearchClick} />
                    </div>
                )}

                <div className="side-bar-button">
                    <ProfileIcon pfp={pfp} onClick={handleSideBarClick} />
                </div>
                </>
            )}
            </div>
        </div>
    );
};

export default Navbar;
