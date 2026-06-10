import { useEffect, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import TestimonialCard from "../components/TestimonialCard";
import Logo from "../assets/logo.svg";
import Menu from "../assets/hamburguer.svg";
import Close from "../assets/close.svg";
import HeroRectangleOne from "../assets/images/rectangleOne.png";
import HeroRectangleTwo from "../assets/images/rectangleTwo.png";
import "../styles/hero.css";
import "../styles/header.css";
import "../styles/utility.css";
import Button from "../components/Button";
import Profile from "../assets/images/profile.png";
import ProfileTwo from "../assets/images/profile2.png";
import ProfileThree from "../assets/images/profile3.png";
import Champion from "../assets/champion.svg";
import Card from "../components/Card";
import Check from "../assets/Check.svg";
import IconInsta from "../assets/insta.svg";
import IconFace from "../assets/face.svg";
import IconYT from "../assets/you.svg";

export default function Home() {
    const [email, setEmail] = useState("");
    function handleCompleteChallenge(token: string | null) {
        if (!token) {
            setChallengeCompleted(false);
            return;
        }
        setChallengeCompleted(true);
    }

    function isValidForm() {
        const isValidFields = email.trim() !== "" && message.trim() !== "";
        return isValidFields && isChallengeCompleted;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!isValidForm()) {
            alert("Por favor, preencha todos os campos e marque a caixa 'Eu não sou um robô'.");
            return;
        }

        try {
            await sendContactEmail();

            alert("Mensagem enviada com sucesso!");
            setEmail("");
            setMessage("");
            setChallengeCompleted(false);
            recaptchaRef.current?.reset();

        } catch (erro: any) {
            alert(erro.message || "Erro ao enviar a mensagem.");
        }
    }
    const [message, setMessage] = useState("");
    const [isChallengeCompleted, setChallengeCompleted] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    async function sendContactEmail() {
        const response = await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                message
            }),
        });

        if (!response.ok) {
            const body = await response.json().catch(() => ({}));
            throw new Error(body.error ?? "Erro ao enviar mensagem.");
        }
    }
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    useEffect(() => {
        const html = document.querySelector("html");
        if (html) {
            html.style.overflow = showMobileMenu ? "hidden" : "auto";
        }
    }, [showMobileMenu]);
    return (
        <>
            <header className="py-sm">
                <div className="container">
                    <nav className="flex items-center justify-between">
                        <img src={Logo} alt="Logo DonaFrost" width={220} height={80} />

                        <div className="desktop-only">
                            <ul className="flex gap-1">
                                <li><a href="#">Home</a></li>
                                <li><a href="#solution">Soluções</a></li>
                                <li><a href="#testimonials">Depoimentos</a></li>
                                <li><a href="#pricing">Preços</a></li>
                                <li><a href="#contato">Contato</a></li>
                            </ul>
                        </div>

                        <div className="desktop-only">
                            <div className="flex items-center">
                                <a className="reverse-color ml-lg" href="">Login</a>
                                <button style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                                    Cadastre-se
                                </button>
                            </div>
                        </div>

                        <div className="mobile-menu">
                            {showMobileMenu ? (
                                <div className="mobile-menu-content">
                                    <div className="container flex">
                                        <ul>
                                            <li><a onClick={() => setShowMobileMenu(!showMobileMenu)} href="#">Home</a></li>
                                            <li> <a onClick={() => setShowMobileMenu(!showMobileMenu)} href="#solution">Soluções</a> </li>
                                            <li> <a onClick={() => setShowMobileMenu(!showMobileMenu)} href="#testimonials">Depoimentos</a> </li>
                                            <li> <a onClick={() => setShowMobileMenu(!showMobileMenu)} href="#pricing">Preços</a> </li>
                                            <li> <a onClick={() => setShowMobileMenu(!showMobileMenu)} href="#contact">Contato</a> </li>
                                            <li><a onClick={() => setShowMobileMenu(!showMobileMenu)} className="reverse-color" href="#">Login</a></li>
                                        </ul>
                                        <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper">
                                            <img src={Close} alt="ícone fechar menu" width={24} height={24} />
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper">
                                    <img src={Menu} alt="ícone menu" width={24} height={24} />
                                </span>

                            )}
                        </div>
                    </nav>
                </div>
            </header>
            <section id="hero">
                <span className="desktop-only">
                    <img src={HeroRectangleTwo} alt="Retangulo um tela inicial" />
                </span>
                <img src={HeroRectangleOne} alt="Retangulo dois tela inicial" />
                <div className="container content">
                    <p className="desktop-only">
                        Olá
                    </p>
                    <h1>Comida de mãe direto no seu apê, é só pedir que entregamos para você!</h1>
                    <p>Já pensou em matar a saudade daquela comida caseira? O melhor de tudo, nossas receitas são 100% saudáveis, bora entrar no shape.
                    </p>
                    <div className="flex gap-1">
                        <span><Button text="Cadastre-se" /></span>
                        <span className="desktop-only">
                            <Button text="Veja mais" secondary />
                        </span>
                    </div>
                </div>
            </section>
            <section id="solution" className="container">
                <header>
                    <span>
                        <h2>Soluções</h2>
                        <span className="desktop-only">
                            <h2>Sob medida para você</h2>
                        </span>
                    </span>
                    <p>
                        Inovação é com a gente! A <strong>DonaFrost </strong>
                        já conquistou diversos clientes, seja você mais um deles,
                        veja tudo que pode ganhar com nossos serviços.
                    </p>
                </header>

                <div className="even-columns container">
                    <Card
                        image={Champion}
                        title="Produto Vencedor"
                        description="Ideia matadora, nosso time já ganhou diversos eventos de inovação com nosso produto, entre eles podemos citar o CityFarm da FAG e Startup Garage."
                    />
                    <Card
                        image={Champion}
                        title="Sabor Caseiro"
                        description="Pratos preparados com aquele toque de mãe, ingredientes selecionados e tempero no ponto certo para alegrar o seu dia."
                    />
                    <Card
                        image={Champion}
                        title="Praticidade"
                        description="Comida congelada de verdade e saudável. Bastam apenas alguns minutos no micro-ondas para saborear direto no seu apê."
                    />
                </div>
            </section >
            <section id="testimonials">
                <header className="container">
                    <span>
                        <p className="desktop-only">Conselho de quem conhece</p>
                        <h2>Cada cliente importa!</h2>
                    </span>
                    <p>
                        Quem já pediu sabe da qualidade das nossas receitas, estamos tirando aquela ideia de que
                        comida congelada tem de ser algo sem gosto, acompanhe abaixo os testemunhos de quem já comprou and aprovou.
                    </p>
                </header>
                <section className="carousel">
                    <div className="carousel-content">

                        <TestimonialCard
                            image={Profile}
                            testimony="Certamente o mercado chinês de eletricos está bombando, só existe uma coisa melhor do que isso, provar uma boa comida DonaFrost no almoço."
                            name="Ellon Ma"
                            role="CEO BING CHILLING"
                            rating={4}
                        />

                        <TestimonialCard
                            image={ProfileTwo}
                            testimony="Depois que comecei a comer os pratos da DonaFrost, economizei tempo e finalmente consegui manter a dieta no dia a dia. Comida maravilhosa!"
                            name="Ryan Gosling"
                            role="Agrônomo"
                            rating={4}
                        />

                        <TestimonialCard
                            image={ProfileThree}
                            testimony="Perseverei com Dona Frost desde o dia que comecei a usá-la, e posso dizer, valeu cada segundo!"
                            name="Fang Yuan"
                            role="Aura Farmer"
                            rating={5}
                        />

                    </div>
                </section>
            </section>
            <section id="pricing" className="container">
                <header>
                    <p className="desktop-only">Planos e preços</p>
                    <h2>Nossos planos</h2>
                </header>
                <section className="even-columns gap-1-5">
                    <div className="pricing-card">
                        <span className="plan">
                            <h3>Básico</h3>
                            <p>Você tem direito a uma prova das comidas DonaFrost.</p>
                        </span>
                        <h2>Grátis</h2>
                        <Button text="Pedir agora" secondary key="free" />
                        <span className="hr" /><span className="features">
                            <img src={Check} alt="ícone check" width={24} height={24} />
                            <p>Retire na loja</p>
                        </span>
                        <ul className="features">
                            <li>
                                <img src={Check} alt="ícone check" width={24} height={24} />
                                <p>Apenas 1 por CPF</p>
                            </li>
                        </ul>
                    </div>
                    <div className="pricing-card premium">
                        <span className="bonus">
                            <p>1º MÊS COM DESCONTO</p>
                        </span>
                        <span className="plan">
                            <h3>Premium</h3>
                            <p>Para quem precisa de uma marmita diária, muito saborosa.</p>
                        </span>
                        <span className="price">
                            <h2>R$ 89,90</h2>
                            <p>/mês</p>
                        </span>
                        <Button text="Pedir agora" secondary key="premium" />
                        <span className="hr" />
                        <span className="features">
                            <img src={Check} alt="ícone check" width={24} height={24} />
                            <p>2 Entregas</p>
                        </span>
                        <span className="features">
                            <img src={Check} alt="ícone check" width={24} height={24} />
                            <p>5 Refeições por semana</p>
                        </span>
                        <span className="features">
                            <img src={Check} alt="ícone check" width={24} height={24} />
                            <p>2 Sucos por semana</p>
                        </span>
                    </div>
                </section>
            </section>
            <section id="contato" style={{ padding: "40px 20px", maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
                <h2>Fale Conosco</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "10px" }}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu e-mail"
                            style={{ width: "100%", padding: "10px" }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Digite sua mensagem"
                            style={{ width: "100%", padding: "10px", height: "100px" }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: "15px", display: "flex", justifyContent: "center" }}>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            onChange={handleCompleteChallenge}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{ padding: "10px 20px", cursor: "pointer", width: "100%" }}
                    >
                        Enviar Mensagem
                    </button>
                </form>
            </section>
            <footer className="footer-container">
                <div className="footer-grid">

                    <div className="footer-brand">
                        <h3>Dona Frost</h3>
                        <p>Comida de verdade, congelada com amor para facilitar o seu dia a dia.</p>
                        <div className="footer-socials">
                            <img src={IconInsta} alt="Instagram" width={24} height={24} />
                            <img src={IconFace} alt="Facebook" width={24} height={24} />
                            <img src={IconYT} alt="YouTube" width={24} height={24} />
                        </div>
                    </div>

                    <div className="footer-column">
                        <h4>A Empresa</h4>
                        <ul className="footer-links">
                            <li>Sobre nós</li>
                            <li>Trabalhe Conosco</li>
                            <li>Blog de Saúde</li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Nossos Serviços</h4>
                        <ul className="footer-links">
                            <li>Cardápio da Semana</li>
                            <li>Planos de Assinatura</li>
                            <li>Zonas de Entrega</li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Suporte</h4>
                        <ul className="footer-links">
                            <li>Como aquecer</li>
                            <li>Tabela Nutricional</li>
                            <li>Dúvidas Frequentes</li>
                        </ul>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>Feito com dor durante a madrugada AJUDA AJUDA AJUDA</p>
                    <p>©2026 PAINTECH - Todos os direitos reservados.</p>
                </div>

            </footer>
        </>
    );
}