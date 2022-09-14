import Skeleton from "react-loading-skeleton";
import React, {useState} from "react";

type Props = {
    imageSrc: string | null | undefined,
}

export const FlagImage = (props: Props) => {
    const [loading, setLoading] = useState(true)

    function onLoadHandler(e: React.SyntheticEvent<HTMLImageElement, Event>) {
        e.currentTarget.classList.remove('hidden')
        setLoading(false)
    }

    return (
        <div className='flex justify-center'>
            {loading ? <Skeleton
                width={150}
                height={100}
                baseColor='#c9c9c9'
                highlightColor='#e6e6e6'
                /> : null}
            {props.imageSrc ?
                <img
                    width={100}
                    onLoad={(e) => {
                        onLoadHandler(e);
                    }}
                    className="hidden rounded"
                    src={props.imageSrc}
                    alt="Country Flag" /> : null}
        </div>
    )
}
