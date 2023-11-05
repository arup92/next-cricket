PGDMP                     
    {            db_sb    15.3    15.2 ;    Y           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Z           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            [           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            \           1262    16399    db_sb    DATABASE     �   CREATE DATABASE db_sb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';
    DROP DATABASE db_sb;
                postgres    false                        2615    16546    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            ]           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5            ^           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            �            1259    16584    Batting    TABLE     G  CREATE TABLE public."Batting" (
    id integer NOT NULL,
    "playerName" text NOT NULL,
    "playerCountryId" text NOT NULL,
    "oppCountryId" text NOT NULL,
    run integer NOT NULL,
    four integer NOT NULL,
    six integer NOT NULL,
    "strikeRate" double precision NOT NULL,
    "venueId" integer,
    "userId" text
);
    DROP TABLE public."Batting";
       public         heap    postgres    false    5            �            1259    16583    Batting_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Batting_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Batting_id_seq";
       public          postgres    false    222    5            _           0    0    Batting_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Batting_id_seq" OWNED BY public."Batting".id;
          public          postgres    false    221            �            1259    16593    Bowling    TABLE     )  CREATE TABLE public."Bowling" (
    id integer NOT NULL,
    "playerName" text NOT NULL,
    "playerCountryId" text NOT NULL,
    "oppCountryId" text NOT NULL,
    maiden integer NOT NULL,
    wicket integer NOT NULL,
    eco double precision NOT NULL,
    "venueId" integer,
    "userId" text
);
    DROP TABLE public."Bowling";
       public         heap    postgres    false    5            �            1259    16592    Bowling_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Bowling_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Bowling_id_seq";
       public          postgres    false    5    224            `           0    0    Bowling_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Bowling_id_seq" OWNED BY public."Bowling".id;
          public          postgres    false    223            �            1259    16575    Match    TABLE        CREATE TABLE public."Match" (
    id integer NOT NULL,
    "teamAId" text NOT NULL,
    "teamBId" text NOT NULL,
    result text NOT NULL,
    "matchDate" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL,
    "venueId" integer NOT NULL,
    "batFirst" text NOT NULL
);
    DROP TABLE public."Match";
       public         heap    postgres    false    5            �            1259    16574    Match_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Match_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Match_id_seq";
       public          postgres    false    220    5            a           0    0    Match_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Match_id_seq" OWNED BY public."Match".id;
          public          postgres    false    219            �            1259    16557    Team    TABLE     �   CREATE TABLE public."Team" (
    id integer NOT NULL,
    "teamName" text NOT NULL,
    "teamId" text NOT NULL,
    "userId" text
);
    DROP TABLE public."Team";
       public         heap    postgres    false    5            �            1259    16556    Team_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Team_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Team_id_seq";
       public          postgres    false    216    5            b           0    0    Team_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Team_id_seq" OWNED BY public."Team".id;
          public          postgres    false    215            �            1259    16547    User    TABLE     �  CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    "verifyToken" text NOT NULL,
    image text,
    "hashedPassword" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "loginId" text
);
    DROP TABLE public."User";
       public         heap    postgres    false    5            �            1259    16566    Venue    TABLE     �   CREATE TABLE public."Venue" (
    id integer NOT NULL,
    "venueId" text NOT NULL,
    "venueName" text NOT NULL,
    "venueCountryId" text NOT NULL,
    "userId" text NOT NULL,
    "matchDate" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Venue";
       public         heap    postgres    false    5            �            1259    16565    Venue_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Venue_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Venue_id_seq";
       public          postgres    false    218    5            c           0    0    Venue_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Venue_id_seq" OWNED BY public."Venue".id;
          public          postgres    false    217            �           2604    16587 
   Batting id    DEFAULT     l   ALTER TABLE ONLY public."Batting" ALTER COLUMN id SET DEFAULT nextval('public."Batting_id_seq"'::regclass);
 ;   ALTER TABLE public."Batting" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �           2604    16596 
   Bowling id    DEFAULT     l   ALTER TABLE ONLY public."Bowling" ALTER COLUMN id SET DEFAULT nextval('public."Bowling_id_seq"'::regclass);
 ;   ALTER TABLE public."Bowling" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    16578    Match id    DEFAULT     h   ALTER TABLE ONLY public."Match" ALTER COLUMN id SET DEFAULT nextval('public."Match_id_seq"'::regclass);
 9   ALTER TABLE public."Match" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    16560    Team id    DEFAULT     f   ALTER TABLE ONLY public."Team" ALTER COLUMN id SET DEFAULT nextval('public."Team_id_seq"'::regclass);
 8   ALTER TABLE public."Team" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    16569    Venue id    DEFAULT     h   ALTER TABLE ONLY public."Venue" ALTER COLUMN id SET DEFAULT nextval('public."Venue_id_seq"'::regclass);
 9   ALTER TABLE public."Venue" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            T          0    16584    Batting 
   TABLE DATA           �   COPY public."Batting" (id, "playerName", "playerCountryId", "oppCountryId", run, four, six, "strikeRate", "venueId", "userId") FROM stdin;
    public          postgres    false    222   YF       V          0    16593    Bowling 
   TABLE DATA           �   COPY public."Bowling" (id, "playerName", "playerCountryId", "oppCountryId", maiden, wicket, eco, "venueId", "userId") FROM stdin;
    public          postgres    false    224   vF       R          0    16575    Match 
   TABLE DATA           q   COPY public."Match" (id, "teamAId", "teamBId", result, "matchDate", "userId", "venueId", "batFirst") FROM stdin;
    public          postgres    false    220   �F       N          0    16557    Team 
   TABLE DATA           D   COPY public."Team" (id, "teamName", "teamId", "userId") FROM stdin;
    public          postgres    false    216   G       L          0    16547    User 
   TABLE DATA           �   COPY public."User" (id, name, email, "isActive", "verifyToken", image, "hashedPassword", "createdAt", "updatedAt", "loginId") FROM stdin;
    public          postgres    false    214   �G       P          0    16566    Venue 
   TABLE DATA           f   COPY public."Venue" (id, "venueId", "venueName", "venueCountryId", "userId", "matchDate") FROM stdin;
    public          postgres    false    218   �H       d           0    0    Batting_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Batting_id_seq"', 1, false);
          public          postgres    false    221            e           0    0    Bowling_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Bowling_id_seq"', 1, false);
          public          postgres    false    223            f           0    0    Match_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Match_id_seq"', 6, true);
          public          postgres    false    219            g           0    0    Team_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Team_id_seq"', 10, true);
          public          postgres    false    215            h           0    0    Venue_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Venue_id_seq"', 17, true);
          public          postgres    false    217            �           2606    16591    Batting Batting_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_pkey";
       public            postgres    false    222            �           2606    16600    Bowling Bowling_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_pkey";
       public            postgres    false    224            �           2606    16582    Match Match_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_pkey";
       public            postgres    false    220            �           2606    16564    Team Team_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Team" DROP CONSTRAINT "Team_pkey";
       public            postgres    false    216            �           2606    16555    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    214            �           2606    16573    Venue Venue_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Venue"
    ADD CONSTRAINT "Venue_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Venue" DROP CONSTRAINT "Venue_pkey";
       public            postgres    false    218            �           1259    16603    Team_teamId_key    INDEX     O   CREATE UNIQUE INDEX "Team_teamId_key" ON public."Team" USING btree ("teamId");
 %   DROP INDEX public."Team_teamId_key";
       public            postgres    false    216            �           1259    16601    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            postgres    false    214            �           1259    16602    User_verifyToken_key    INDEX     Y   CREATE UNIQUE INDEX "User_verifyToken_key" ON public."User" USING btree ("verifyToken");
 *   DROP INDEX public."User_verifyToken_key";
       public            postgres    false    214            �           2606    16645    Batting Batting_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_userId_fkey";
       public          postgres    false    3494    214    222            �           2606    16640    Batting Batting_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 J   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_venueId_fkey";
       public          postgres    false    222    218    3500            �           2606    16655    Bowling Bowling_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_userId_fkey";
       public          postgres    false    214    3494    224            �           2606    16650    Bowling Bowling_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 J   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_venueId_fkey";
       public          postgres    false    3500    224    218            �           2606    16625    Match Match_result_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_result_fkey" FOREIGN KEY (result) REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_result_fkey";
       public          postgres    false    220    216    3498            �           2606    16615    Match Match_teamAId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_teamAId_fkey" FOREIGN KEY ("teamAId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_teamAId_fkey";
       public          postgres    false    3498    220    216            �           2606    16620    Match Match_teamBId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_teamBId_fkey" FOREIGN KEY ("teamBId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_teamBId_fkey";
       public          postgres    false    216    220    3498            �           2606    16672    Match Match_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_userId_fkey";
       public          postgres    false    220    214    3494            �           2606    16677    Match Match_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_venueId_fkey";
       public          postgres    false    220    218    3500            �           2606    16605    Team Team_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 C   ALTER TABLE ONLY public."Team" DROP CONSTRAINT "Team_userId_fkey";
       public          postgres    false    3494    216    214            �           2606    16610    Venue Venue_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Venue"
    ADD CONSTRAINT "Venue_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Venue" DROP CONSTRAINT "Venue_userId_fkey";
       public          postgres    false    214    3494    218            T      x������ � �      V      x������ � �      R   x   x�3���s�t�FFƺ��F�
V`ę���Ye�j�f �ey�U�i�&斜�& M\&�A��`� b����QF��4q��]�B07e�P��Ⱦ �	� �\1z\\\ ��A�      N   �   x�}��
�@���>AdY�q#I�h	!���K���=}J���0R[B*(��|�:��S�����ڄQ� F7��NR�#�P�84��zS�J08ą��dqgn�'[�Tj�`/$C�����5�dK�;C#����'Ae�AT5��Rq<14F2��ɹ`�\�����y�������)      L   �   x�]�MO�0��s�;p�鿥k�$�� :e�](RFj��˧w�7���)[�,��4�e���ZF�]������*��7��?�5���+���C��>n2~��I�8	��T�t'E�m/�G�9E�#:�Ȧ�j�(���w^�%n�_i��g��Ã�<r���&}�yK� J(s �V }N}&1���g>�E묅�����Oj&�[����F_      P   �   x��ҽ�0����@͵�C�,&j�8� �@R(����4�8Ѵi����i�p��(!��C�t�	��/�~ղks�B��e�"w7�&���,�ͳ�p��������J��Z�I3��̎s�oC��Y��0�� *]�����0�=�C�6�>t[C�w�e�����9ȴ��MC�;�����e�+B�/�     