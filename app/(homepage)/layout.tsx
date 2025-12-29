import Header from "@/components/header/Header";

export default function HomepageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <section className="first-section">
                <Header />
            </section>
            <main>{children}</main>
        </>
    );
}