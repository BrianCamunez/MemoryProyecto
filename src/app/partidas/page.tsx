"use client"

import Header from "@/components/misComponentes/Header";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const Partidas = () => {
    const partidas = [
        { duracion: "02:15", puntos: 1500, clicks: 87 },
        { duracion: "01:42", puntos: 1340, clicks: 70 },
        { duracion: "03:10", puntos: 1725, clicks: 102 },
        { duracion: "00:59", puntos: 980, clicks: 50 },
        { duracion: "02:45", puntos: 1620, clicks: 91 },
    ];

    const totalPuntos = partidas.reduce((acc, partida) => acc + partida.puntos, 0);
    const totalClicks = partidas.reduce((acc, partida) => acc + partida.clicks, 0);

    return (
        <>
            <Header />
            <div className="flex justify-center px-4 py-10">
                <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
                    <Table>
                        <TableCaption className="text-lg font-medium text-gray-600 mb-4">
                            📊 Estadístiques recents de les partides
                        </TableCaption>
                        <TableHeader>
                            <TableRow className="bg-blue-50">
                                <TableHead className="text-blue-800 font-semibold">⏱️ Duració</TableHead>
                                <TableHead className="text-blue-800 font-semibold">🎯 Punts</TableHead>
                                <TableHead className="text-right text-blue-800 font-semibold">🖱️ Clics</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {partidas.map((partida, idx) => (
                                <TableRow
                                    key={idx}
                                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                >
                                    <TableCell className="font-medium">{partida.duracion}</TableCell>
                                    <TableCell
                                        className={partida.puntos >= 1600 ? "text-green-600 font-semibold" : ""}
                                    >
                                        {partida.puntos}
                                    </TableCell>
                                    <TableCell
                                        className={`text-right ${partida.clicks > 100 ? "text-red-500 font-semibold" : ""}`}
                                    >
                                        {partida.clicks}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow className="bg-gray-100">
                                <TableCell className="font-semibold">Total</TableCell>
                                <TableCell className="font-semibold text-green-700">{totalPuntos}</TableCell>
                                <TableCell className="text-right font-semibold text-red-700">{totalClicks}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default Partidas;
