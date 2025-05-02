import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const UserContext = createContext();

// Create the provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState("");

    // Function to log in a user
    const loginUser = (userData) => {
        // Ensure username is properly set from userData
        const userWithUsername = {
            ...userData,
            username: userData.username || userData.name || "", // Use username if available, fallback to name
            profilePicture: userData.profilePicture || "" // Ensure profilePicture is included
        };
        
        sessionStorage.setItem("user", JSON.stringify(userWithUsername));
        setUser(userWithUsername);
        setUsername(userWithUsername.username);
        setProfilePicture(userWithUsername.profilePicture || "");
    };

    // Function to update profile picture
    const updateProfilePicture = (newProfilePicture) => {
        // Update the user object with the new profile picture
        // const updatedUser = {
        //     ...user,
        //     profilePicture: newProfilePicture
        // };
        
        // // Update sessionStorage
        // sessionStorage.setItem("user", JSON.stringify(updatedUser));
        
        // // Update state
        // setUser(updatedUser);
        // setProfilePicture(newProfilePicture);

        const updatedUser = {
            ...user,
            profilePicture: newProfilePicture,
        };
    
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setProfilePicture(newProfilePicture);
    
        // ADD THIS LINE ONLY IF YOU WANT TO ENSURE USERNAME STAYS IN SYNC TOO:
        setUsername(updatedUser.username || updatedUser.name || "");
    };

    // Function to log out a user
    const logoutUser = () => {
        sessionStorage.removeItem("user");
        setUser(null);
        setUsername("");
        setProfilePicture("");
    };

    // Load user from sessionStorage on app start
    useEffect(() => {
        try {
            const storedUser = sessionStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setUsername(parsedUser.username || parsedUser.name || "");
                setProfilePicture(parsedUser.profilePicture || "");
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            sessionStorage.removeItem("user");
        }
    }, []);

    return (
        <UserContext.Provider value={{ 
            user, 
            username, 
            profilePicture, 
            loginUser, 
            logoutUser, 
            updateProfilePicture 
        }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the context
export const useUser = () => {
    return useContext(UserContext);
};