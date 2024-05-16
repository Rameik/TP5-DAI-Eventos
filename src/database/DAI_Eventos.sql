--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-05-16 19:52:55

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

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4877 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 223 (class 1259 OID 16679)
-- Name: event_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_categories_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 232 (class 1259 OID 16742)
-- Name: event_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_categories (
    id integer DEFAULT nextval('public.event_categories_id_seq'::regclass) NOT NULL,
    name character varying,
    display_order integer
);


ALTER TABLE public.event_categories OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16678)
-- Name: event_enrollments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_enrollments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_enrollments_id_seq OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16734)
-- Name: event_enrollments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_enrollments (
    id integer DEFAULT nextval('public.event_enrollments_id_seq'::regclass) NOT NULL,
    id_event integer NOT NULL,
    id_user integer,
    description text,
    attended boolean,
    observations text,
    rating integer,
    registration_date_time timestamp with time zone
);


ALTER TABLE public.event_enrollments OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16677)
-- Name: event_locations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_locations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_locations_id_seq OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16726)
-- Name: event_locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_locations (
    id integer DEFAULT nextval('public.event_locations_id_seq'::regclass) NOT NULL,
    id_location integer NOT NULL,
    name character varying,
    full_address character varying,
    max_capacity character varying,
    latitude numeric,
    longitude numeric
);


ALTER TABLE public.event_locations OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16676)
-- Name: event_tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_tags_id_seq OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16720)
-- Name: event_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_tags (
    id integer DEFAULT nextval('public.event_tags_id_seq'::regclass) NOT NULL,
    id_event integer NOT NULL,
    id_tag integer
);


ALTER TABLE public.event_tags OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16674)
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16712)
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer DEFAULT nextval('public.events_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    id_event_category integer,
    id_event_location integer NOT NULL,
    duration_in_minutes integer,
    price integer,
    enabled_for_enrollment boolean,
    max_assistance integer,
    id_creator_user integer,
    start_date timestamp with time zone
);


ALTER TABLE public.events OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16675)
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.locations_id_seq OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16704)
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locations (
    id integer DEFAULT nextval('public.locations_id_seq'::regclass) NOT NULL,
    name character varying,
    id_province integer NOT NULL,
    latitude numeric,
    longitude numeric
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16673)
-- Name: provinces_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.provinces_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.provinces_id_seq OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16696)
-- Name: provinces; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.provinces (
    id integer DEFAULT nextval('public.provinces_id_seq'::regclass) NOT NULL,
    name character varying,
    full_name character varying,
    latitude numeric,
    longitude numeric,
    display_order integer
);


ALTER TABLE public.provinces OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16672)
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tags_id_seq OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16688)
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id integer DEFAULT nextval('public.tags_id_seq'::regclass) NOT NULL,
    name character varying
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16671)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16680)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    first_name text,
    last_name text,
    username text,
    password text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4871 (class 0 OID 16742)
-- Dependencies: 232
-- Data for Name: event_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event_categories VALUES (1, 'Musica', 1);


--
-- TOC entry 4870 (class 0 OID 16734)
-- Dependencies: 231
-- Data for Name: event_enrollments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event_enrollments VALUES (1, 2, 2, 'Alto show', true, 'Terrible', 6, '2024-01-21 03:00:00-03');
INSERT INTO public.event_enrollments VALUES (22, 2, 3, 'ASDASD', true, 'Una locura', 6, '2024-05-16 19:12:39.610234-03');


--
-- TOC entry 4869 (class 0 OID 16726)
-- Dependencies: 230
-- Data for Name: event_locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event_locations VALUES (1, 1, 'Club Atlético River Plate', 'Av. Pres. Figueroa Alcorta 7597', '84567', -34.54454505693356, -58.4494761175694);


--
-- TOC entry 4868 (class 0 OID 16720)
-- Dependencies: 229
-- Data for Name: event_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event_tags VALUES (1, 2, 1);
INSERT INTO public.event_tags VALUES (2, 2, 2);


--
-- TOC entry 4867 (class 0 OID 16712)
-- Dependencies: 228
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.events VALUES (2, 'Taylor Swift', 'Un alto show', 1, 1, 210, 15500, true, 120000, 2, '2024-07-21 03:00:00-03');
INSERT INTO public.events VALUES (3, 'Milo Jota', 'Un terible show', 1, 1, 210, 20000, true, 100000, 3, '2024-06-21 03:00:00-03');


--
-- TOC entry 4866 (class 0 OID 16704)
-- Dependencies: 227
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.locations VALUES (1, 'Nuñez', 1, -34.548805236816406, -58.463230133056641);


--
-- TOC entry 4865 (class 0 OID 16696)
-- Dependencies: 226
-- Data for Name: provinces; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.provinces VALUES (1, 'Ciudad Autónoma de Buenos Aires', 'Ciudad Autónoma de Buenos Aires', -34.61444091796875, -58.44587707519531, 1);
INSERT INTO public.provinces VALUES (7, 'Chaco Provincia', 'Provincia de Chacoo', -24.89508628845215, -59.93218994140625, 2);


--
-- TOC entry 4864 (class 0 OID 16688)
-- Dependencies: 225
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tags VALUES (1, 'Rock');
INSERT INTO public.tags VALUES (2, 'Pop');


--
-- TOC entry 4863 (class 0 OID 16680)
-- Dependencies: 224
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (2, 'Julian', 'Schiffer', 'Jschiffer', '1234');
INSERT INTO public.users VALUES (3, 'Rodolfo', 'Gomez', 'rodogom', '1234');
INSERT INTO public.users VALUES (4, 'Rodolfo', 'Gomez', 'rodogom', '1234');


--
-- TOC entry 4878 (class 0 OID 0)
-- Dependencies: 223
-- Name: event_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_categories_id_seq', 2, true);


--
-- TOC entry 4879 (class 0 OID 0)
-- Dependencies: 222
-- Name: event_enrollments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_enrollments_id_seq', 22, true);


--
-- TOC entry 4880 (class 0 OID 0)
-- Dependencies: 221
-- Name: event_locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_locations_id_seq', 1, true);


--
-- TOC entry 4881 (class 0 OID 0)
-- Dependencies: 220
-- Name: event_tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_tags_id_seq', 2, true);


--
-- TOC entry 4882 (class 0 OID 0)
-- Dependencies: 218
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 4, true);


--
-- TOC entry 4883 (class 0 OID 0)
-- Dependencies: 219
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locations_id_seq', 1, true);


--
-- TOC entry 4884 (class 0 OID 0)
-- Dependencies: 217
-- Name: provinces_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.provinces_id_seq', 7, true);


--
-- TOC entry 4885 (class 0 OID 0)
-- Dependencies: 216
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_id_seq', 2, true);


--
-- TOC entry 4886 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- TOC entry 4702 (class 2606 OID 16749)
-- Name: event_categories event_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_categories
    ADD CONSTRAINT event_categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4700 (class 2606 OID 16741)
-- Name: event_enrollments event_enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_enrollments
    ADD CONSTRAINT event_enrollments_pkey PRIMARY KEY (id);


--
-- TOC entry 4698 (class 2606 OID 16733)
-- Name: event_locations event_locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_locations
    ADD CONSTRAINT event_locations_pkey PRIMARY KEY (id);


--
-- TOC entry 4695 (class 2606 OID 16725)
-- Name: event_tags event_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_tags
    ADD CONSTRAINT event_tags_pkey PRIMARY KEY (id);


--
-- TOC entry 4692 (class 2606 OID 16719)
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- TOC entry 4690 (class 2606 OID 16711)
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- TOC entry 4688 (class 2606 OID 16703)
-- Name: provinces provinces_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provinces
    ADD CONSTRAINT provinces_pkey PRIMARY KEY (id);


--
-- TOC entry 4686 (class 2606 OID 16695)
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- TOC entry 4684 (class 2606 OID 16687)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4693 (class 1259 OID 16785)
-- Name: fki_fk_elocations_events; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_elocations_events ON public.events USING btree (id_event_location);


--
-- TOC entry 4696 (class 1259 OID 16791)
-- Name: fki_fk_etags_events; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_etags_events ON public.event_tags USING btree (id_event);


--
-- TOC entry 4704 (class 2606 OID 16780)
-- Name: events fk_elocations_events; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT fk_elocations_events FOREIGN KEY (id_event_location) REFERENCES public.event_locations(id) NOT VALID;


--
-- TOC entry 4709 (class 2606 OID 16770)
-- Name: event_locations fk_elocations_locations; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_locations
    ADD CONSTRAINT fk_elocations_locations FOREIGN KEY (id_location) REFERENCES public.locations(id) NOT VALID;


--
-- TOC entry 4710 (class 2606 OID 16775)
-- Name: event_enrollments fk_enrollments_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_enrollments
    ADD CONSTRAINT fk_enrollments_users FOREIGN KEY (id_user) REFERENCES public.users(id) NOT VALID;


--
-- TOC entry 4707 (class 2606 OID 16786)
-- Name: event_tags fk_etags_events; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_tags
    ADD CONSTRAINT fk_etags_events FOREIGN KEY (id_event) REFERENCES public.events(id) NOT VALID;


--
-- TOC entry 4708 (class 2606 OID 16765)
-- Name: event_tags fk_etags_tags; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_tags
    ADD CONSTRAINT fk_etags_tags FOREIGN KEY (id_tag) REFERENCES public.tags(id) NOT VALID;


--
-- TOC entry 4705 (class 2606 OID 16760)
-- Name: events fk_events_ecategory; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT fk_events_ecategory FOREIGN KEY (id_event_category) REFERENCES public.event_categories(id) NOT VALID;


--
-- TOC entry 4706 (class 2606 OID 16755)
-- Name: events fk_events_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT fk_events_users FOREIGN KEY (id_creator_user) REFERENCES public.users(id) NOT VALID;


--
-- TOC entry 4703 (class 2606 OID 16750)
-- Name: locations fk_locations_provinces; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT fk_locations_provinces FOREIGN KEY (id_province) REFERENCES public.provinces(id) NOT VALID;


-- Completed on 2024-05-16 19:52:55

--
-- PostgreSQL database dump complete
--

