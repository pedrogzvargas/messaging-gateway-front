import { useEffect, useState } from "react";
import {
    FaRegCalendarAlt,
    FaCheck,
    // FaPhone,
    // FaChartLine,
    // FaChartBar,
    // FaRobot,
} from "react-icons/fa";
import { getDashboardSummary } from "@/app/features/home/services/dashboard.ts";
import type { DashboardSummary } from "@/app/features/home/types/Dashboard.ts";
import Spinner from "@/shared/components/Spinner.tsx";
import UnexpectedError from "@/shared/components/UnexpectedError";

// const TOKENS_USED = 35_000;
// const TOKENS_AVAILABLE = 350_000;
// const USAGE_PERCENT = Math.round((TOKENS_USED / TOKENS_AVAILABLE) * 100);

const formatNumber = (value: number) =>
    new Intl.NumberFormat("es-MX").format(value);

// const formatCompact = (value: number) =>
//     new Intl.NumberFormat("es-MX", {
//         notation: "compact",
//         maximumFractionDigits: 0,
//     }).format(value);

const todayLabel = new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
}).format(new Date());

const Dashboard = () => {
    const [summary, setSummary] = useState<DashboardSummary | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    const fetchSummary = async () => {
        try {
            const response = await getDashboardSummary();
            setSummary(response.data);
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
        await fetchSummary();
    };

    useEffect(() => {
        fetchSummary().catch(console.error);
    }, []);

    const metrics = [
        {
            label: "Conversaciones de hoy",
            value: formatNumber(summary?.conversations_today ?? 0),
            hint: "Actividad del día",
            icon: FaRegCalendarAlt,
            iconClass: "bg-gray-100 text-gray-600",
        },
        {
            label: "Total de conversaciones",
            value: formatNumber(summary?.conversations_total ?? 0),
            hint: "Histórico acumulado",
            icon: FaCheck,
            iconClass: "bg-green-50 text-green-600",
        },
        // {
        //     label: "Mi número",
        //     value: "7461104241",
        //     hint: "Canal principal",
        //     icon: FaPhone,
        //     iconClass: "bg-gray-100 text-gray-600",
        // },
    ];

    return (
        <div className="container w-full px-4 py-10">
            <div className="mb-8">
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                    {todayLabel}
                </p>
                <h1 className="text-2xl text-gray-800 font-normal">
                    Bienvenido de vuelta
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                    Resumen de actividad y consumo de tu plan.
                </p>
            </div>

            <section className="w-full flex flex-col items-center justify-center">
                <h2 className="text-sm font-normal text-gray-500 mb-3 pl-1 justify-start w-full">
                    Actividad
                </h2>

                {isLoading && <Spinner />}

                {!isLoading && hasError && <UnexpectedError onRetry={handleRecover} />}

                {!isLoading && !hasError && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                        {metrics.map((metric) => {
                            const Icon = metric.icon;

                            return (
                                <div
                                    key={metric.label}
                                    className="bg-white border border-gray-300 rounded-md p-4 transition-colors hover:border-gray-400"
                                >
                                    <div className="flex items-start justify-between gap-3 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-500 font-light">
                                                {metric.label}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                {metric.hint}
                                            </p>
                                        </div>
                                        <span
                                            className={`flex items-center justify-center h-9 w-9 rounded-md ${metric.iconClass}`}
                                        >
                                            <Icon className="text-base" />
                                        </span>
                                    </div>
                                    <p className="text-3xl text-gray-700 tracking-tight">
                                        {metric.value}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/*<section>*/}
            {/*    <div className="flex items-end justify-between gap-3 mb-3 pl-1">*/}
            {/*        <div>*/}
            {/*            <h2 className="text-sm font-normal text-gray-500">*/}
            {/*                Consumo de tokens*/}
            {/*            </h2>*/}
            {/*            <p className="text-xs text-gray-400 mt-0.5">*/}
            {/*                Uso del modelo frente al saldo disponible*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*        <p className="text-xs text-gray-500 shrink-0">*/}
            {/*            {USAGE_PERCENT}% utilizado*/}
            {/*        </p>*/}
            {/*    </div>*/}

            {/*    <div className="bg-white border border-gray-300 rounded-md overflow-hidden">*/}
            {/*        <div className="px-4 pt-4 pb-3 border-b border-gray-200">*/}
            {/*            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">*/}
            {/*                <span>{formatCompact(TOKENS_USED)} usados</span>*/}
            {/*                <span>{formatCompact(TOKENS_AVAILABLE)} disponibles</span>*/}
            {/*            </div>*/}
            {/*            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">*/}
            {/*                <div*/}
            {/*                    className="h-full rounded-full bg-black transition-all"*/}
            {/*                    style={{ width: `${USAGE_PERCENT}%` }}*/}
            {/*                    role="progressbar"*/}
            {/*                    aria-valuenow={USAGE_PERCENT}*/}
            {/*                    aria-valuemin={0}*/}
            {/*                    aria-valuemax={100}*/}
            {/*                    aria-label="Porcentaje de tokens consumidos"*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">*/}
            {/*            <div className="p-4">*/}
            {/*                <div className="flex items-start justify-between gap-3 mb-3">*/}
            {/*                    <div>*/}
            {/*                        <p className="text-sm text-gray-500 font-light">*/}
            {/*                            Tokens consumidos*/}
            {/*                        </p>*/}
            {/*                        <p className="text-xs text-gray-400 mt-0.5">*/}
            {/*                            Periodo actual*/}
            {/*                        </p>*/}
            {/*                    </div>*/}
            {/*                    <span className="flex items-center justify-center h-9 w-9 rounded-md bg-blue-50 text-blue-600">*/}
            {/*                        <FaChartLine className="text-base" />*/}
            {/*                    </span>*/}
            {/*                </div>*/}
            {/*                <p className="text-2xl text-gray-700 tracking-tight">*/}
            {/*                    {formatNumber(TOKENS_USED)}*/}
            {/*                </p>*/}
            {/*            </div>*/}

            {/*            <div className="p-4">*/}
            {/*                <div className="flex items-start justify-between gap-3 mb-3">*/}
            {/*                    <div>*/}
            {/*                        <p className="text-sm text-gray-500 font-light">*/}
            {/*                            Tokens disponibles*/}
            {/*                        </p>*/}
            {/*                        <p className="text-xs text-gray-400 mt-0.5">*/}
            {/*                            Saldo restante*/}
            {/*                        </p>*/}
            {/*                    </div>*/}
            {/*                    <span className="flex items-center justify-center h-9 w-9 rounded-md bg-green-50 text-green-600">*/}
            {/*                        <FaChartBar className="text-base" />*/}
            {/*                    </span>*/}
            {/*                </div>*/}
            {/*                <p className="text-2xl text-gray-700 tracking-tight">*/}
            {/*                    {formatNumber(TOKENS_AVAILABLE)}*/}
            {/*                </p>*/}
            {/*            </div>*/}

            {/*            <div className="p-4">*/}
            {/*                <div className="flex items-start justify-between gap-3 mb-3">*/}
            {/*                    <div>*/}
            {/*                        <p className="text-sm text-gray-500 font-light">*/}
            {/*                            Modelo*/}
            {/*                        </p>*/}
            {/*                        <p className="text-xs text-gray-400 mt-0.5">*/}
            {/*                            Motor del agente*/}
            {/*                        </p>*/}
            {/*                    </div>*/}
            {/*                    <span className="flex items-center justify-center h-9 w-9 rounded-md bg-gray-100 text-gray-600">*/}
            {/*                        <FaRobot className="text-base" />*/}
            {/*                    </span>*/}
            {/*                </div>*/}
            {/*                <p className="text-2xl text-gray-700 tracking-tight">*/}
            {/*                    GPT-4o-mini*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </div>
    );
};

export default Dashboard;
