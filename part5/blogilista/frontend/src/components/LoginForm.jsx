const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Username: <input
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    Password: <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">LOGIN</button>
            </form>
        </div>
    )
}

export default LoginForm