import { FadeLoader } from 'react-spinners'

export default function Loader() {
    const loaderStyle = {
        display: 'block',
        margin: '0 auto',
        borderColor: 'red',
    }

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        width: '100vw', // Full viewport width
    }

    return (
        <div style={containerStyle}>
            <FadeLoader
                color={'#0095f6'}
                loading={true}
                cssOverride={loaderStyle}
                height={100}
                width={5}
                aria-label="Loading Spinner"
                data-testid="loader"
                speedMultiplier={1.5}
            />
        </div>
    )
}
