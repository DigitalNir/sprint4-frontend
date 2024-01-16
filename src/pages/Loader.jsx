import { CSSProperties } from 'react'
import { ClipLoader, FadeLoader } from 'react-spinners'

export default function Loader() {
    const CSSProperties = {
        display: 'block',
        margin: '0 auto',
        borderColor: 'red',
    }
    return (
        // <div className="loader">
        <FadeLoader
            color={'#36d7b7'}
            loading={true}
            cssOverride={CSSProperties}
            // size={150}
            height={'40'}
            width={'5'}
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier={'2'}
        />
        // </div>
    )
}
