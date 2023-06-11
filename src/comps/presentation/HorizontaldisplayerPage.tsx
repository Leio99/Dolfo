import React from "react"
import { goToApiBlock } from "../MenuContent"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"
import { HorizontalDisplayItem, HorizontalDisplayer } from "../layout/HorizontalDisplayer"

export class HorizontaldisplayerPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render an horizontal displayer of items.</WhenToUse>
        <Usage />

        <ResultCode
            title="Example"
            result={<HorizontalDisplayer>
                <HorizontalDisplayItem imageUrl="https://www.veneto.info/wp-content/uploads/sites/114/verona.jpg" title="Verona" infos="Verona è una città della regione Veneto, nel nord Italia. Il suo centro storico, costruito in un'ansa del fiume Adige, è di epoca medievale. Verona è conosciuta per essere la città di Romeo e Giulietta, i personaggi dell'opera di Shakespeare, e non a caso ospita un edificio del XVI secolo chiamato 'la casa di Giulietta', con un delizioso balcone affacciato su un cortile. L'Arena di Verona, grande anfiteatro romano del primo secolo, ospita concerti e opere liriche"></HorizontalDisplayItem>
                <HorizontalDisplayItem imageUrl="https://a.cdn-hotels.com/gdcs/production40/d811/5e89ad90-8f10-11e8-b6b0-0242ac110007.jpg?impolicy=fcrop&w=800&h=533&q=medium" title="Roma" infos="Roma, capitale dell’Italia, è una grande città cosmopolita con una storia artistica, architettonica e culturale che ha influenzato tutto il mondo e che risale a quasi 3000 anni fa. Le antiche rovine come il Foro e il Colosseo testimoniano la potenza dell’antico Impero romano. Nella Città del Vaticano, sede della Chiesa Cattolica, si trovano la Basilica di San Pietro e i Musei Vaticani, che ospitano capolavori come la Cappella Sistina affrescata da Michelangelo."></HorizontalDisplayItem>
                <HorizontalDisplayItem imageUrl="https://tourismmedia.italia.it/is/image/mitur/20210401173629-firenze-toscana-gettyimages-1145040590?wid=1600&hei=900&fit=constrain,1&fmt=webp" title="Firenze" infos="Firenze, capoluogo della Toscana, ospita molti capolavori dell'arte e dell'architettura rinascimentale. Uno dei luoghi più celebri è il Duomo, la cattedrale con cupola di tegole progettata dal Brunelleschi e il campanile di Giotto. La Galleria dell'Accademia espone la scultura del David di Michelangelo mentre nella Galleria degli Uffizi si trovano La nascita di Venere di Botticelli e l’Annunciazione di Leonardo da Vinci."></HorizontalDisplayItem>
                <HorizontalDisplayItem imageUrl="https://siviaggia.it/wp-content/uploads/sites/2/2016/09/cosa-vedere-napoli.jpg" title="Napoli" infos="Napoli è una città vibrante nel sud Italia, famosa per la sua pizza, l'arte barocca e il Vesuvio."></HorizontalDisplayItem>
                <HorizontalDisplayItem imageUrl="https://www.dissapore.com/wp-content/uploads/2021/08/torino-001.jpg" title="Torino" infos="Torino è una città nel nord Italia, con un ricco patrimonio storico e culturale, e sede di importanti industrie e musei."></HorizontalDisplayItem>
                <HorizontalDisplayItem imageUrl="https://www.italia.it/content/dam/tdh/it/interests/emilia-romagna/bologna/bologna-in-un-giorno-itinerario-alla-scoperta-della-citta/media/1600X1000_bologna_in_un_giorno_hero.jpg" title="Bologna" infos="Bologna è una città universitaria con una vivace scena culturale, famosa per le sue torri medievali e la cucina tradizionale."></HorizontalDisplayItem>
                <HorizontalDisplayItem imageUrl="https://www.yesmilano.it/sites/default/files/articolo/copertina/6143/22465/Copertina-milano-at-a-glance-ph-photophonico.png" title="Milano" infos="Milano è la capitale economica e della moda d'Italia. Situata nella regione della Lombardia, la città è famosa per la sua ricchezza storica, architettonica e culturale. Milano è rinomata per la sua imponente cattedrale gotica, il Duomo di Milano, e per la sua celebre opera, La Scala."></HorizontalDisplayItem>
                <HorizontalDisplayItem>
                    Palermo è la capitale della regione siciliana e una città ricca di storia, cultura e bellezze naturali. Situata lungo la costa nord-occidentale dell'isola, Palermo vanta un patrimonio architettonico affascinante che riflette le influenze di diverse civiltà, tra cui fenici, romani, bizantini, arabi e normanni.
                </HorizontalDisplayItem>
            </HorizontalDisplayer>}
            code={'<HorizontalDisplayer>\n\t<HorizontalDisplayItem imageUrl="https://www.veneto.info/wp-content/uploads/sites/114/verona.jpg" title="Verona" infos="Verona è una città della regione Veneto, nel nord Italia. Il suo centro storico, costruito in un\'ansa del fiume Adige, è di epoca medievale. Verona è conosciuta per essere la città di Romeo e Giulietta, i personaggi dell\'opera di Shakespeare, e non a caso ospita un edificio del XVI secolo chiamato \'la casa di Giulietta\', con un delizioso balcone affacciato su un cortile. L\'Arena di Verona, grande anfiteatro romano del primo secolo, ospita concerti e opere liriche"></HorizontalDisplayItem>\n\t<HorizontalDisplayItem imageUrl="https://a.cdn-hotels.com/gdcs/production40/d811/5e89ad90-8f10-11e8-b6b0-0242ac110007.jpg?impolicy=fcrop&w=800&h=533&q=medium" title="Roma" infos="Roma, capitale dell’Italia, è una grande città cosmopolita con una storia artistica, architettonica e culturale che ha influenzato tutto il mondo e che risale a quasi 3000 anni fa. Le antiche rovine come il Foro e il Colosseo testimoniano la potenza dell’antico Impero romano. Nella Città del Vaticano, sede della Chiesa Cattolica, si trovano la Basilica di San Pietro e i Musei Vaticani, che ospitano capolavori come la Cappella Sistina affrescata da Michelangelo."></HorizontalDisplayItem>\n\t<HorizontalDisplayItem imageUrl="https://tourismmedia.italia.it/is/image/mitur/20210401173629-firenze-toscana-gettyimages-1145040590?wid=1600&hei=900&fit=constrain,1&fmt=webp" title="Firenze" infos="Firenze, capoluogo della Toscana, ospita molti capolavori dell\'arte e dell\'architettura rinascimentale. Uno dei luoghi più celebri è il Duomo, la cattedrale con cupola di tegole progettata dal Brunelleschi e il campanile di Giotto. La Galleria dell\'Accademia espone la scultura del David di Michelangelo mentre nella Galleria degli Uffizi si trovano La nascita di Venere di Botticelli e l’Annunciazione di Leonardo da Vinci."></HorizontalDisplayItem>\n\t<HorizontalDisplayItem imageUrl="https://siviaggia.it/wp-content/uploads/sites/2/2016/09/cosa-vedere-napoli.jpg" title="Napoli" infos="Napoli è una città vibrante nel sud Italia, famosa per la sua pizza, l\'arte barocca e il Vesuvio."></HorizontalDisplayItem>\n\t<HorizontalDisplayItem imageUrl="https://www.dissapore.com/wp-content/uploads/2021/08/torino-001.jpg" title="Torino" infos="Torino è una città nel nord Italia, con un ricco patrimonio storico e culturale, e sede di importanti industrie e musei."></HorizontalDisplayItem>\n\t<HorizontalDisplayItem imageUrl="https://www.italia.it/content/dam/tdh/it/interests/emilia-romagna/bologna/bologna-in-un-giorno-itinerario-alla-scoperta-della-citta/media/1600X1000_bologna_in_un_giorno_hero.jpg" title="Bologna" infos="Bologna è una città universitaria con una vivace scena culturale, famosa per le sue torri medievali e la cucina tradizionale."></HorizontalDisplayItem>\n\t<HorizontalDisplayItem imageUrl="https://www.yesmilano.it/sites/default/files/articolo/copertina/6143/22465/Copertina-milano-at-a-glance-ph-photophonico.png" title="Milano" infos="Milano è la capitale economica e della moda d\'Italia. Situata nella regione della Lombardia, la città è famosa per la sua ricchezza storica, architettonica e culturale. Milano è rinomata per la sua imponente cattedrale gotica, il Duomo di Milano, e per la sua celebre opera, La Scala."></HorizontalDisplayItem>\n\t<HorizontalDisplayItem>Palermo è la capitale della regione siciliana e una città ricca di storia, cultura e bellezze naturali. Situata lungo la costa nord-occidentale dell\'isola, Palermo vanta un patrimonio architettonico affascinante che riflette le influenze di diverse civiltà, tra cui fenici, romani, bizantini, arabi e normanni.\n</HorizontalDisplayItem>'}
        />

        <Apis data={[
            {
                name: "Element children",
                desc: "The single items to show.",
                type: "HorizontalDisplayItem",
                required: true,
                onDoubleClick: () => goToApiBlock("#itemsProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "className",
                desc: "Additional className to apply to the displayer.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "Additional style for the displayer.",
                type: "CSSProperties",
                required: false,
                default: "null"
            }
        ]} />

        <Apis id="itemsProps" title="Display item properties" data={[
            {
                name: "title",
                desc: "The title of the card.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "imageUrl",
                desc: "Background image for the item.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "infos",
                desc: "Additional infos for the item.",
                type: "string or JSX",
                required: false,
                default: "null"
            },
            {
                name: "onClick",
                desc: "Function triggered when the user clicks the item.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "None"
            },
            {
                name: "className",
                desc: "Additional className to apply to the item.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "Additional style for the item.",
                type: "CSSProperties",
                required: false,
                default: "null"
            }
        ]} />
    </>
}