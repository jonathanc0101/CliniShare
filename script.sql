SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: conexionesActivas; Type: TABLE; Schema: public; Owner: clinishare
--

CREATE TABLE public."conexionesActivas" (
    id uuid NOT NULL,
    "nombreUsuario" character varying(255) NOT NULL,
    "idMedico" uuid NOT NULL,
    ip character varying(255) NOT NULL,
    activa boolean DEFAULT true NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."conexionesActivas" OWNER TO clinishare;

--
-- Name: eventos; Type: TABLE; Schema: public; Owner: clinishare
--

CREATE TABLE public.eventos (
    id uuid NOT NULL,
    titulo character varying(255) NOT NULL,
    fecha timestamp with time zone DEFAULT now() NOT NULL,
    descripcion character varying(255) NOT NULL,
    importante boolean DEFAULT false NOT NULL,
    "fechaModificacion" timestamp with time zone DEFAULT now() NOT NULL,
    "pacienteId" uuid,
    "medicoId" uuid
);


ALTER TABLE public.eventos OWNER TO clinishare;

--
-- Name: medicos; Type: TABLE; Schema: public; Owner: clinishare
--

CREATE TABLE public.medicos (
    id uuid NOT NULL,
    nombre character varying(255) NOT NULL,
    apellido character varying(255) NOT NULL,
    dni character varying(255) NOT NULL,
    matricula character varying(255),
    "fechaModificacion" timestamp with time zone DEFAULT now(),
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.medicos OWNER TO clinishare;

--
-- Name: pacientes; Type: TABLE; Schema: public; Owner: clinishare
--

CREATE TABLE public.pacientes (
    id uuid NOT NULL,
    nombre character varying(255) NOT NULL,
    apellido character varying(255) NOT NULL,
    dni character varying(255) NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    "fechaModificacion" timestamp with time zone DEFAULT now(),
    "ownerId" uuid
);


ALTER TABLE public.pacientes OWNER TO clinishare;

--
-- Name: sincronizacions; Type: TABLE; Schema: public; Owner: clinishare
--

CREATE TABLE public.sincronizacions (
    id integer NOT NULL,
    fecha timestamp with time zone NOT NULL,
    "medicoId" uuid
);


ALTER TABLE public.sincronizacions OWNER TO clinishare;

--
-- Name: sincronizacions_id_seq; Type: SEQUENCE; Schema: public; Owner: clinishare
--

CREATE SEQUENCE public.sincronizacions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sincronizacions_id_seq OWNER TO clinishare;

--
-- Name: sincronizacions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: clinishare
--

ALTER SEQUENCE public.sincronizacions_id_seq OWNED BY public.sincronizacions.id;


--
-- Name: sincronizacions id; Type: DEFAULT; Schema: public; Owner: clinishare
--

ALTER TABLE ONLY public.sincronizacions ALTER COLUMN id SET DEFAULT nextval('public.sincronizacions_id_seq'::regclass);


--
-- Data for Name: conexionesActivas; Type: TABLE DATA; Schema: public; Owner: clinishare
--

COPY public."conexionesActivas" (id, "nombreUsuario", "idMedico", ip, activa, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: eventos; Type: TABLE DATA; Schema: public; Owner: clinishare
--

COPY public.eventos (id, titulo, fecha, descripcion, importante, "fechaModificacion", "pacienteId", "medicoId") FROM stdin;
71224082-57c9-486e-b2ad-ee7eac2c9a2e	Consulta guardía	2022-10-10 23:43:55.255548-03	Dolor en la garganta, se le recetó paracetamol.	f	2022-10-10 23:43:55.255548-03	51593e39-8f87-4f36-bf31-c330c9909ba3	e3835c4f-d343-4a1f-856d-e8bed40bac9d
4c0840c9-12bd-4d93-bcd9-8fdd90f6d649	Posible gastritis	2022-10-10 23:46:06.628682-03	Dolor constante en el pecho y estomago. Se lo derivó a gastroenterología.	t	2022-10-10 23:46:06.628682-03	51593e39-8f87-4f36-bf31-c330c9909ba3	e3835c4f-d343-4a1f-856d-e8bed40bac9d
f0ab5aee-e5f9-48ce-88d9-29bae4c19b11	Consulta guardía	2022-10-10 23:47:19.180253-03	Presenta fiebre alta, se lo derivó con enfermería.	f	2022-10-10 23:47:19.180253-03	51593e39-8f87-4f36-bf31-c330c9909ba3	e3835c4f-d343-4a1f-856d-e8bed40bac9d
\.


--
-- Data for Name: medicos; Type: TABLE DATA; Schema: public; Owner: clinishare
--

COPY public.medicos (id, nombre, apellido, dni, matricula, "fechaModificacion", password, "createdAt", "updatedAt") FROM stdin;
e3835c4f-d343-4a1f-856d-e8bed40bac9d	Pedro	Derbes	1000	AAAA	2022-10-10 23:42:26.358924-03	abcde	2022-10-10 23:42:26.328-03	2022-10-10 23:42:26.328-03
\.


--
-- Data for Name: pacientes; Type: TABLE DATA; Schema: public; Owner: clinishare
--

COPY public.pacientes (id, nombre, apellido, dni, activo, "fechaModificacion", "ownerId") FROM stdin;
51593e39-8f87-4f36-bf31-c330c9909ba3	Nicole	Alvarado	1111	t	2022-10-10 23:41:54.058441-03	\N
f697e07a-2812-4a08-9573-11958e4f9680	José	Díaz	2222	t	2022-10-10 23:42:09.152912-03	\N
19cf8400-a6d8-4ac0-8ebf-5201132f18f0	Juan	Cavia	3333	t	2022-10-11 15:52:37.243738-03	\N
\.


--
-- Data for Name: sincronizacions; Type: TABLE DATA; Schema: public; Owner: clinishare
--

COPY public.sincronizacions (id, fecha, "medicoId") FROM stdin;
\.


--
-- Name: sincronizacions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: clinishare
--

SELECT pg_catalog.setval('public.sincronizacions_id_seq', 1, false);


--
-- Name: conexionesActivas conexionesActivas_pkey; Type: CONSTRAINT; Schema: public; Owner: clinishare
--

ALTER TABLE ONLY public."conexionesActivas"
    ADD CONSTRAINT "conexionesActivas_pkey" PRIMARY KEY (id);


--
-- Name: eventos eventos_pkey; Type: CONSTRAINT; Schema: public; Owner: clinishare
--

ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT eventos_pkey PRIMARY KEY (id);


--
-- Name: medicos medicos_dni_key; Type: CONSTRAINT; Schema: public; Owner: clinishare
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_dni_key UNIQUE (dni);


--
-- Name: medicos medicos_matricula_key; Type: CONSTRAINT; Schema: public; Owner: clinishare
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_matricula_key UNIQUE (matricula);


--
-- Name: medicos medicos_pkey; Type: CONSTRAINT; Schema: public; Owner: clinishare
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_pkey PRIMARY KEY (id);


--
-- Name: pacientes pacientes_dni_key; Type: CONSTRAINT; Schema: public; Owner: clinishare
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_dni_key UNIQUE (dni);


--
-- Name: pacientes pacientes_pkey; Type: CONSTRAINT; Schema: public; Owner: clinishare
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_pkey PRIMARY KEY (id);


--
-- Name: sincronizacions sincronizacions_pkey; Type: CONSTRAINT; Schema: public; Owner: clinishare
--

ALTER TABLE ONLY public.sincronizacions
    ADD CONSTRAINT sincronizacions_pkey PRIMARY KEY (id);


--
-- Name: eventos eventos_medicoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: clinishare
--

ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT "eventos_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES public.medicos(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: eventos eventos_pacienteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: clinishare
--

ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT "eventos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES public.pacientes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: pacientes pacientes_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: clinishare
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT "pacientes_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public.medicos(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: sincronizacions sincronizacions_medicoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: clinishare
--

ALTER TABLE ONLY public.sincronizacions
    ADD CONSTRAINT "sincronizacions_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES public.medicos(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

