import React, {useEffect, useState} from 'react';
import _ from "lodash";
import wiki, {wikiSummary} from 'wikipedia';
import {MagnifyingGlass} from "react-loader-spinner";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {Tab, TabPanel, Tabs, TabsBody, TabsHeader} from "@material-tailwind/react";
import './assets/core/css/App.css';
import Map from "./components/Map/Map";
import Info from "./components/Info/Info";
import Summary from "./components/Summary/Summary";
import {CountryDetail, CountryInfo, CountryState} from "./contracts/Conuntry";

const SweetAlert = withReactContent(Swal)

const countryState: CountryState = {
    name: 'iran',
}

function App() {
    const [country, setCountry] = useState(countryState)
    const [countrySummary, setCountrySummary] = useState(null as wikiSummary | null)
    const [countryInfo, setCountryInfo] = useState(null as null | CountryInfo)
    const [flag, setFlag] = useState(null as null | string)
    const [isLoading, setIsLoading] = useState(true)

    function handleSelectCountry(country: CountryDetail) {
        setCountry({
            name: country.name
        })
        setIsLoading(true)
    }

    useEffect(() => {
        (async () => {
            try {
                if (_.isString(country.name)) {
                    const wikiData = await wiki.page(country.name)
                    const [summary, info, images] = await Promise.all([
                        wikiData.summary(),
                        wikiData.infobox(),
                        wikiData.media(),
                    ])
                    const flag = info.imageFlag.replace(/\s/g, '_')
                    images.items.some(image => {
                        if (image.title.includes(flag)) {
                            setFlag(image.srcset[0].src);
                            return true;
                        }
                        return false;
                    })
                    if (_.isUndefined(summary.extract)) {
                        await SweetAlert.fire({
                            title: <span>Not found country</span>,
                            icon: 'error',
                        })
                        setCountrySummary(null)
                        setIsLoading(false)
                        return;
                    }
                    setCountrySummary(summary)
                    setCountryInfo({
                        currency: info.currency,
                        language: info.officialLanguages,
                        capital: info.capital,
                        population: info.populationEstimate,
                        url: summary.content_urls.desktop.page
                    })
                    setIsLoading(false)
                }
            } catch (error) {
                await SweetAlert.fire({
                    title: <span>Not found country</span>,
                    icon: 'error',
                })
                setIsLoading(false)
            }
        })()
    }, [country.name])

    return (
        isLoading ?
            <div className='loader'>
                <MagnifyingGlass
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor='#c0efff'
                    color='#e15b64'
                />
            </div> :
            <div className="m-auto container overflow-hidden">
                <div className="flex justify-center relative p-5">
                    <Map selectCountryHandler={handleSelectCountry} />
                </div>
                <Tabs id="custom-animation" className='px-16' value="info">
                    <TabsHeader className='bg-indigo-200' indicatorProps={{className: 'bg-gradient-to-tr to-indigo-400 from-indigo-800'}}>
                        <Tab className='text-white' key='info' value='info'>Info <i className="fa-duotone fa-circle-info text-xl ml-1"></i></Tab>
                        <Tab className='text-white' key='summary' value='summary'>Summary <i className="fa-duotone fa-clipboard-list text-xl ml-1"></i></Tab>
                    </TabsHeader>
                    <TabsBody
                        animate={{
                            mount: {y: 0},
                            unmount: {y: 250},
                        }}>
                        <TabPanel key='info' value='info'>
                            <Info info={countryInfo} flag={flag} country={countrySummary?.title ?? '----'} />
                        </TabPanel>
                        <TabPanel key='summary' value='summary'>
                            <Summary summary={countrySummary?.extract ?? null} />
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </div>
    );
}

export default App;
