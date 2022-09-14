import React from 'react';
import ImageMapper, {Map as MapContract, MapAreas} from '@mohamadtsn/react-img-mapper';
import Image from "./map.jpg"
import ImageMapData from "./image-data.json"

type Props = {
    selectCountryHandler: Function,
}

const Map = (props: Props) => {
    const Areas: MapAreas[] = (ImageMapData.areas as unknown as Array<MapAreas>)
    const MapData: MapContract = {
        name: ImageMapData.name,
        areas: Areas
    }

    return (
        <div className='block h-[400px] w-[550px]'>
            <ImageMapper
                onClick={(e) => {
                    props.selectCountryHandler(e)
                }}
                src={Image}
                map={MapData}
                width={500}
                imgWidth={1000}
            />
        </div>
    );
}

export default Map;
