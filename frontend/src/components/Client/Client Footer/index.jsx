import Container from 'react-bootstrap/Container';
import { NavLink } from "react-router-dom";

export default function UserFooter() {
    return (
        <div className="py-[70px] bg-no-repeat bg-cover bg-[var(--movies-bg)] text-[var(--text-color)] footer-bg">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <div>
                        <h4>HAQQIMIZDA:</h4>
                        <p>Diziyle Öğren İngilizce öğrenmek için dizi ve film izleyenlere yönelik olarak 2019'da kurulmuş olan bir platformdur. Ziyaretçilerimiz istedikleri bir dizi veya filmde kullanılan tüm kelimeleri sitemizden veya mobil uygulamamızdan öğrenebilir. Detaylı bilgi</p>
                    </div>
                    <div>
                        <h4>BLOG:</h4>
                        <NavLink
                            to="/blog"
                            className="no-underline font-['PT_Serif'] block"
                            style={({ isActive }) => {
                                return isActive ? { color: "var(--text-color)" } : { color: "#06b6d4" };
                            }}>
                            <span>Dizi İzleyerek İngilizce Öğrenmek Ayrıntılı Rehber</span>
                        </NavLink>
                        <NavLink
                            to="/blog"
                            className="no-underline font-['PT_Serif'] block"
                            style={({ isActive }) => {
                                return isActive ? { color: "var(--text-color)" } : { color: "#06b6d4" };
                            }}>
                            <span>Dizi İzleyerek İngilizce Öğrenmek Ayrıntılı Rehber</span>
                        </NavLink>
                        <NavLink
                            to="/blog"
                            className="no-underline font-['PT_Serif'] block"
                            style={({ isActive }) => {
                                return isActive ? { color: "var(--text-color)" } : { color: "#06b6d4" };
                            }}>
                            <span>Dizi İzleyerek İngilizce Öğrenmek Ayrıntılı Rehber</span>
                        </NavLink>
                        <NavLink
                            to="/blog"
                            className="no-underline font-['PT_Serif'] block"
                            style={({ isActive }) => {
                                return isActive ? { color: "var(--text-color)" } : { color: "#06b6d4" };
                            }}>
                            <span>Dizi İzleyerek İngilizce Öğrenmek Ayrıntılı Rehber</span>
                        </NavLink>
                        <NavLink
                            to="/blog"
                            className="no-underline font-['PT_Serif'] block"
                            style={({ isActive }) => {
                                return isActive ? { color: "var(--text-color)" } : { color: "#06b6d4" };
                            }}>
                            <span>Dizi İzleyerek İngilizce Öğrenmek Ayrıntılı Rehber</span>
                        </NavLink>  
                    </div>
                    <div>
                        <h4>ƏLAQƏ:</h4>
                        <h4>SOSİAL HESABLAR</h4>
                        <p>Diziyle Öğren İngilizce öğrenmek için dizi ve film izleyenlere yönelik olarak 2019'da kurulmuş olan bir platformdur. Ziyaretçilerimiz istedikleri bir dizi veya filmde kullanılan tüm kelimeleri sitemizden veya mobil uygulamamızdan öğrenebilir. Detaylı bilgi</p>
                    </div>
                </div>
            </Container>
        </div>
    )
}