// import React from 'react'
import { useState } from 'react'
import './Login.css'

const Login = () => {

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

   const validate = () => {
    if (!identifier.trim() || !password.trim()) return 'Veuillez renseigner identifiant et mot de passe.';
    if (password.length < 6) return 'Le mot de passe doit contenir au moins 6 caractères.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (v) { setErrorMsg(v); return; }
    setErrorMsg('');
    setLoading(true);
    try {
      
    } catch (error) {
      
    }finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2 className="login-title">Connexion</h2>

        {errorMsg && (
          <div className="alert-error" role="alert" aria-live="assertive">
            {errorMsg}
          </div>
        )}
         <label htmlFor="identifier" style={{textAlign:"start"}}>Identifiant ou email</label>
        <input
          id="identifier"
          name="identifier"
          type="text"
          placeholder="ex: jdoe ou jdoe@mail.com"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          autoComplete="username"
          required
        />
       
        <label htmlFor="password" style={{textAlign:"start"}}>Mot de passe</label>
        <div className="pwd-field">
          <input
            id="password"
            name="password"
            type={showPwd ? 'text' : 'password'}
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            className="toggle-pwd"
            onClick={() => setShowPwd(s => !s)}
            aria-label={showPwd ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            {showPwd ? '🙈' : '👁️'}
          </button>
        </div>

        <div className="row-between">
          <label className="remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Se souvenir de moi
          </label>
          <a className="link-muted" href="#mdp-oublie">Mot de passe oublié ?</a>
        </div>

        <button
          className="btn-submit"
          type="submit"
          disabled={loading || !identifier.trim() || !password.trim()}
        >
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}

export default Login