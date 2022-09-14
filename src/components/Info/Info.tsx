import React from 'react';
import {Button, Card} from "@material-tailwind/react";
import Skeleton from "react-loading-skeleton";
import {FlagImage} from "./FlagImage";
import {CountryInfo} from "../../contracts/Conuntry";

type Props = {
    info: CountryInfo | null,
    flag: null | string,
    country: null | string,
}

function Info(props: Props) {
    return (
        <div className='flex justify-center'>
            <Card className='py-8 px-8 pb-6 Pastel bg-gradient-to-tr from-purple-500 to-orange-300 shadow-lg'>
                <FlagImage imageSrc={props.flag}  />
                <h1 className='text-lg text-center capitalize mt-2 font-bold'>{props.country}</h1>
                {
                    props.info ?
                        <ul className='list-disc ml-3'>
                            <li className="pt-1"><span className='font-bold'>Capital:</span> {props.info.capital}</li>
                            <li className="pt-1"><span className='font-bold'>Language:</span> {props.info.language}</li>
                            <li className="pt-1"><span className='font-bold'>Population:</span> {props.info.population}
                            </li>
                            <li className="py-1"><span className='font-bold'>Currency:</span> {props.info.currency}</li>
                        </ul> :
                        <Skeleton
                            className='mt-2'
                            baseColor='#c9c9c9'
                            highlightColor='#e6e6e6'
                            count={4} />
                }
                <div className='flex justify-center mt-4'>
                    <a target='_blank' rel='noreferrer' href={props.info?.url ?? '#'} className='block'>
                        <Button className='normal-case' variant='gradient' color='indigo'>View on
                            Wikipedia <i className="fad fa-arrow-up-right-from-square text-lg leading-none ml-1 align-bottom"></i></Button>
                    </a>
                </div>
            </Card>
        </div>
    );
}

export default Info;
