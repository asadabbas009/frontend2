import React from 'react';

const UserDetails = ({ user }) => {
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Details:</h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="mb-2">
                    <strong className="text-gray-800">Name:</strong> {user.name}
                </p>
                <p className="mb-2">
                    <strong className="text-gray-800">Email:</strong> {user.email}
                </p>
                <p className="mb-2">
                    <strong className="text-gray-800">Role:</strong> {user.role}
                </p>
            </div>
        </div>
    );
};

export default UserDetails;
