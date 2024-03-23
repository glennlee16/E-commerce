import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const PremiumPage = () => {
    return (
        <Authenticator>
            {({ signOut }) => (
                <div>
                    <h1>Premium Content</h1>
                    <button onClick={signOut}>Sign Out</button>
                </div>
            )}
        </Authenticator>
    )
};

export default PremiumPage;