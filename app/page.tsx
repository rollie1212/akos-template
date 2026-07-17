import { getProfile } from "@/lib/profile";

export const dynamic = "force-dynamic";

export default function Home() {
  const result = getProfile();

  if (!result.success) {
    return (
      <main className="shell">
        <section className="error-card">
          <p className="eyebrow">Configuration error</p>
          <h1>AKOS could not load your profile</h1>
          <pre>{result.error}</pre>
        </section>
      </main>
    );
  }

  const profile = result.data;

  return (
    <main>
      <nav className="nav">
        <strong>{profile.name}</strong>
        <div><a href="#experience">Experience</a><a href="#projects">Projects</a></div>
      </nav>

      <section className="hero shell">
        <p className="eyebrow">{profile.location}</p>
        <h1>{profile.name}</h1>
        <h2>{profile.headline}</h2>
        <p className="summary">{profile.summary}</p>
        <div className="links">{profile.links.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div>
      </section>

      <section className="section shell">
        <p className="eyebrow">Capabilities</p>
        <div className="grid">{profile.capabilities.map((item) => <article key={item}><h3>{item}</h3></article>)}</div>
      </section>

      <section className="section shell" id="experience">
        <p className="eyebrow">Experience</p>
        {profile.experience.map((item) => (
          <article className="row" key={`${item.company}-${item.role}`}>
            <div><h3>{item.company}</h3><small>{item.period}</small></div>
            <div><h3>{item.role}</h3><p>{item.summary}</p></div>
            <ul>{item.evidence.map((point) => <li key={point}>{point}</li>)}</ul>
          </article>
        ))}
      </section>

      <section className="section shell" id="projects">
        <p className="eyebrow">Projects</p>
        <div className="grid">{profile.projects.map((project) => <article className="card" key={project.name}><h3>{project.name}</h3><p>{project.description}</p><p>{project.skills.join(" · ")}</p>{project.url ? <a href={project.url} target="_blank" rel="noreferrer">View project ↗</a> : null}</article>)}</div>
      </section>

      <footer className="footer shell"><span>Powered by AKOS</span><a href="https://github.com/rollie1212/akos-main" target="_blank" rel="noreferrer">Project source ↗</a></footer>
    </main>
  );
}
