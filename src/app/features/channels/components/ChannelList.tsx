import type { Channel } from "@/app/features/channels/types/Channel.ts";
import {useEffect, useState} from "react";
import { getChannels } from "@/app/features/channels/services/channel.ts";
import ChannelItem from "@/app/features/channels/components/ChannelItem.tsx";
import Spinner from "@/shared/components/Spinner.tsx";
import UnexpectedError from "@/shared/components/UnexpectedError";
import ResultsNotFund from "@/shared/components/ResultsNotFund.tsx";

const ChannelList = () => {
    const [channelsList, setChannelsList] = useState<Channel[] | undefined>(undefined)
    const [page, ] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false)

    const fetchChannels = async (page: number, name?: string) => {
        try {
            const response = await getChannels({page, name});
            setChannelsList(response.results);
            console.log(response);
        } catch (err) {
            setHasError(true);
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRecover = async () => {
        setIsLoading(true);
        setHasError(false);
        await fetchChannels(page)
    }

    useEffect(() => {
        try {
            fetchChannels(page).catch(console.error);
        } finally {
            console.log("Error")
        }
    }, [page]);

    return (
        <div className="container flex flex-col items-center justify-center w-full">
            <div className="w-full mb-3">
                <h1 className="font-normal text-lg pl-5 text-gray-600">Canales</h1>
            </div>
            { isLoading && <Spinner /> }

            {!isLoading && !hasError && (channelsList?.length ?? 0) > 0 && <div className="bg-white border border-gray-300 rounded-md w-full">
                <table className="border-collapse table-auto w-full text-left">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="font-normal text-gray-600 px-4 py-3">Id</th>
                        <th className="font-normal text-gray-600">Origen</th>
                        <th className="font-normal text-gray-600">Negocio</th>
                        <th className="font-normal text-gray-600">Identificador</th>
                        <th className="font-normal text-gray-600">Display</th>
                        <th className="font-normal text-gray-600">Creado</th>
                    </tr>
                    </thead>
                    <tbody>
                    {channelsList?.map(channel => (
                        <ChannelItem
                            key={channel.id}
                            id={channel.id}
                            channel={channel.channel}
                            business={channel.business}
                            provider_id={channel.provider_id}
                            display_name={channel.display_name}
                            created_at={channel.created_at}
                            updated_at={channel.updated_at}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
            }

            { hasError && !isLoading && <UnexpectedError onRetry={handleRecover}/>}
            { channelsList !== undefined && channelsList.length === 0 && !isLoading && <ResultsNotFund subtitle="No pudimos encontrar canales"/>}
        </div>
    )
}

export default ChannelList
