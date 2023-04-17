import React from "react"
import { goToApiBlock } from "../MenuContent"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"
import { CardsSwiper, SwiperCard } from "../layout/CardsSwiper"

export class CarswiperPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a cards slider.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple cards swiper"
            result={<CardsSwiper style={{ margin: "0 3rem" }}>
                <SwiperCard>
                    <img src="https://www.veneto.info/wp-content/uploads/sites/114/verona.jpg" alt="verona" />
                    <p>Verona è una città della regione Veneto, nel nord Italia. Il suo centro storico, costruito in un'ansa del fiume Adige, è di epoca medievale. Verona è conosciuta per essere la città di Romeo e Giulietta, i personaggi dell'opera di Shakespeare, e non a caso ospita un edificio del XVI secolo chiamato "la casa di Giulietta", con un delizioso balcone affacciato su un cortile. L'Arena di Verona, grande anfiteatro romano del primo secolo, ospita concerti e opere liriche. </p>
                </SwiperCard>
                <SwiperCard>
                    <img src="https://a.cdn-hotels.com/gdcs/production40/d811/5e89ad90-8f10-11e8-b6b0-0242ac110007.jpg?impolicy=fcrop&w=800&h=533&q=medium" alt="roma" />
                    <p>Roma, capitale dell’Italia, è una grande città cosmopolita con una storia artistica, architettonica e culturale che ha influenzato tutto il mondo e che risale a quasi 3000 anni fa. Le antiche rovine come il Foro e il Colosseo testimoniano la potenza dell’antico Impero romano. Nella Città del Vaticano, sede della Chiesa Cattolica, si trovano la Basilica di San Pietro e i Musei Vaticani, che ospitano capolavori come la Cappella Sistina affrescata da Michelangelo.</p>
                </SwiperCard>
                <SwiperCard>
                    <img src="https://tourismmedia.italia.it/is/image/mitur/20210401173629-firenze-toscana-gettyimages-1145040590?wid=1600&hei=900&fit=constrain,1&fmt=webp" alt="firenze" />
                    <p>Firenze, capoluogo della Toscana, ospita molti capolavori dell'arte e dell'architettura rinascimentale. Uno dei luoghi più celebri è il Duomo, la cattedrale con cupola di tegole progettata dal Brunelleschi e il campanile di Giotto. La Galleria dell'Accademia espone la scultura del David di Michelangelo mentre nella Galleria degli Uffizi si trovano La nascita di Venere di Botticelli e l’Annunciazione di Leonardo da Vinci.</p>
                </SwiperCard>
            </CardsSwiper>}
            code={'<CardsSwiper>\n\t<SwiperCard>\n\t\t<img src="https://www.veneto.info/wp-content/uploads/sites/114/verona.jpg" />\n\t\t<p>Verona è una città della regione Veneto, nel nord Italia. Il suo centro storico, costruito in un\'ansa del fiume Adige, è di epoca medievale. Verona è conosciuta per essere la città di Romeo e Giulietta, i personaggi dell\'opera di Shakespeare, e non a caso ospita un edificio del XVI secolo chiamato "la casa di Giulietta", con un delizioso balcone affacciato su un cortile. L\'Arena di Verona, grande anfiteatro romano del primo secolo, ospita concerti e opere liriche. </p>\n\t</SwiperCard>\n\n\t<SwiperCard>\n\t\t<img src="https://a.cdn-hotels.com/gdcs/production40/d811/5e89ad90-8f10-11e8-b6b0-0242ac110007.jpg?impolicy=fcrop&w=800&h=533&q=medium" />\n\t\t<p>Roma, capitale dell’Italia, è una grande città cosmopolita con una storia artistica, architettonica e culturale che ha influenzato tutto il mondo e che risale a quasi 3000 anni fa. Le antiche rovine come il Foro e il Colosseo testimoniano la potenza dell’antico Impero romano. Nella Città del Vaticano, sede della Chiesa Cattolica, si trovano la Basilica di San Pietro e i Musei Vaticani, che ospitano capolavori come la Cappella Sistina affrescata da Michelangelo.</p>\n\t</SwiperCard>\n\n\t<SwiperCard>\n\t\t<img src="https://tourismmedia.italia.it/is/image/mitur/20210401173629-firenze-toscana-gettyimages-1145040590?wid=1600&hei=900&fit=constrain,1&fmt=webp" />\n\t\t<p>Firenze, capoluogo della Toscana, ospita molti capolavori dell\'arte e dell\'architettura rinascimentale. Uno dei luoghi più celebri è il Duomo, la cattedrale con cupola di tegole progettata dal Brunelleschi e il campanile di Giotto. La Galleria dell\'Accademia espone la scultura del David di Michelangelo mentre nella Galleria degli Uffizi si trovano La nascita di Venere di Botticelli e l’Annunciazione di Leonardo da Vinci.</p>\n\t</SwiperCard>\n</CardsSwiper>'}
        />

        <ResultCode
            title="Titles"
            result={<CardsSwiper style={{ margin: "0 3rem" }}>
                <SwiperCard title="Verona">
                    <img src="https://www.veneto.info/wp-content/uploads/sites/114/verona.jpg" alt="verona" />
                    <p>Verona è una città della regione Veneto, nel nord Italia. Il suo centro storico, costruito in un'ansa del fiume Adige, è di epoca medievale. Verona è conosciuta per essere la città di Romeo e Giulietta, i personaggi dell'opera di Shakespeare, e non a caso ospita un edificio del XVI secolo chiamato "la casa di Giulietta", con un delizioso balcone affacciato su un cortile. L'Arena di Verona, grande anfiteatro romano del primo secolo, ospita concerti e opere liriche. </p>
                </SwiperCard>
                <SwiperCard title="Roma">
                    <img src="https://a.cdn-hotels.com/gdcs/production40/d811/5e89ad90-8f10-11e8-b6b0-0242ac110007.jpg?impolicy=fcrop&w=800&h=533&q=medium" alt="roma" />
                    <p>Roma, capitale dell’Italia, è una grande città cosmopolita con una storia artistica, architettonica e culturale che ha influenzato tutto il mondo e che risale a quasi 3000 anni fa. Le antiche rovine come il Foro e il Colosseo testimoniano la potenza dell’antico Impero romano. Nella Città del Vaticano, sede della Chiesa Cattolica, si trovano la Basilica di San Pietro e i Musei Vaticani, che ospitano capolavori come la Cappella Sistina affrescata da Michelangelo.</p>
                </SwiperCard>
                <SwiperCard title="Firenze">
                    <img src="https://tourismmedia.italia.it/is/image/mitur/20210401173629-firenze-toscana-gettyimages-1145040590?wid=1600&hei=900&fit=constrain,1&fmt=webp" alt="firenze" />
                    <p>Firenze, capoluogo della Toscana, ospita molti capolavori dell'arte e dell'architettura rinascimentale. Uno dei luoghi più celebri è il Duomo, la cattedrale con cupola di tegole progettata dal Brunelleschi e il campanile di Giotto. La Galleria dell'Accademia espone la scultura del David di Michelangelo mentre nella Galleria degli Uffizi si trovano La nascita di Venere di Botticelli e l’Annunciazione di Leonardo da Vinci.</p>
                </SwiperCard>
            </CardsSwiper>}
            code={'<CardsSwiper>\n\t<SwiperCard title="Verona">\n\t\t<img src="https://www.veneto.info/wp-content/uploads/sites/114/verona.jpg" />\n\t\t<p>Verona è una città della regione Veneto, nel nord Italia. Il suo centro storico, costruito in un\'ansa del fiume Adige, è di epoca medievale. Verona è conosciuta per essere la città di Romeo e Giulietta, i personaggi dell\'opera di Shakespeare, e non a caso ospita un edificio del XVI secolo chiamato "la casa di Giulietta", con un delizioso balcone affacciato su un cortile. L\'Arena di Verona, grande anfiteatro romano del primo secolo, ospita concerti e opere liriche. </p>\n\t</SwiperCard>\n\n\t<SwiperCard title="Roma">\n\t\t<img src="https://a.cdn-hotels.com/gdcs/production40/d811/5e89ad90-8f10-11e8-b6b0-0242ac110007.jpg?impolicy=fcrop&w=800&h=533&q=medium" />\n\t\t<p>Roma, capitale dell’Italia, è una grande città cosmopolita con una storia artistica, architettonica e culturale che ha influenzato tutto il mondo e che risale a quasi 3000 anni fa. Le antiche rovine come il Foro e il Colosseo testimoniano la potenza dell’antico Impero romano. Nella Città del Vaticano, sede della Chiesa Cattolica, si trovano la Basilica di San Pietro e i Musei Vaticani, che ospitano capolavori come la Cappella Sistina affrescata da Michelangelo.</p>\n\t</SwiperCard>\n\n\t<SwiperCard title="Firenze">\n\t\t<img src="https://tourismmedia.italia.it/is/image/mitur/20210401173629-firenze-toscana-gettyimages-1145040590?wid=1600&hei=900&fit=constrain,1&fmt=webp" />\n\t\t<p>Firenze, capoluogo della Toscana, ospita molti capolavori dell\'arte e dell\'architettura rinascimentale. Uno dei luoghi più celebri è il Duomo, la cattedrale con cupola di tegole progettata dal Brunelleschi e il campanile di Giotto. La Galleria dell\'Accademia espone la scultura del David di Michelangelo mentre nella Galleria degli Uffizi si trovano La nascita di Venere di Botticelli e l’Annunciazione di Leonardo da Vinci.</p>\n\t</SwiperCard>\n</CardsSwiper>'}
        />

        <Apis data={[
            {
                name: "Element children",
                desc: "The single cards to show.",
                type: "SwiperCard",
                required: true,
                onDoubleClick: () => goToApiBlock("#cardsProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "className",
                desc: "Additional className to apply to the swiper.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "Additional style for the swiper.",
                type: "CSSProperties",
                required: false,
                default: "null"
            }
        ]} />

        <Apis id="cardsProps" title="Slide properties" data={[
            {
                name: "title",
                desc: "The title of the card.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional className to apply to the card.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "style",
                desc: "Additional style for the card.",
                type: "CSSProperties",
                required: false,
                default: "null"
            }
        ]} />
    </>
}