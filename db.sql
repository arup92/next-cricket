PGDMP     1    +            
    {            db_sb    12.1    12.1 P    t           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            u           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            v           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            w           1262    116886    db_sb    DATABASE     �   CREATE DATABASE db_sb WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_India.1252' LC_CTYPE = 'English_India.1252';
    DROP DATABASE db_sb;
                postgres    false            x           0    0    SCHEMA public    ACL     R   REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT CREATE ON SCHEMA public TO PUBLIC;
                   postgres    false    3            %           1247    116888    BowlingType    TYPE     O   CREATE TYPE public."BowlingType" AS ENUM (
    'Fast',
    'Spin',
    'NA'
);
     DROP TYPE public."BowlingType";
       public          postgres    false            (           1247    116896    MatchFormat    TYPE     N   CREATE TYPE public."MatchFormat" AS ENUM (
    'ODI',
    'T20',
    'IPL'
);
     DROP TYPE public."MatchFormat";
       public          postgres    false            �           1247    116904 
   PlayerType    TYPE     e   CREATE TYPE public."PlayerType" AS ENUM (
    'Batsman',
    'Bowler',
    'AllRounder',
    'NA'
);
    DROP TYPE public."PlayerType";
       public          postgres    false            �            1259    116913    Batting    TABLE     �  CREATE TABLE public."Batting" (
    id integer NOT NULL,
    "oppCountryId" text NOT NULL,
    run integer NOT NULL,
    four integer NOT NULL,
    six integer NOT NULL,
    "strikeRate" double precision NOT NULL,
    "matchDate" date NOT NULL,
    "matchFormat" public."MatchFormat" NOT NULL,
    "venueId" text NOT NULL,
    "userId" text NOT NULL,
    "playerId" text NOT NULL,
    "matchId" integer NOT NULL,
    "teamId" text NOT NULL
);
    DROP TABLE public."Batting";
       public         heap    postgres    false    552            �            1259    116919    Batting_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Batting_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Batting_id_seq";
       public          postgres    false    202            y           0    0    Batting_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Batting_id_seq" OWNED BY public."Batting".id;
          public          postgres    false    203            �            1259    116921    Bowling    TABLE     �  CREATE TABLE public."Bowling" (
    id integer NOT NULL,
    "oppCountryId" text NOT NULL,
    maiden integer NOT NULL,
    wicket integer NOT NULL,
    eco double precision NOT NULL,
    "matchDate" date NOT NULL,
    "matchFormat" public."MatchFormat" NOT NULL,
    "venueId" text NOT NULL,
    "userId" text NOT NULL,
    "playerId" text NOT NULL,
    "matchId" integer NOT NULL,
    "teamId" text NOT NULL
);
    DROP TABLE public."Bowling";
       public         heap    postgres    false    552            �            1259    116927    Bowling_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Bowling_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Bowling_id_seq";
       public          postgres    false    204            z           0    0    Bowling_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Bowling_id_seq" OWNED BY public."Bowling".id;
          public          postgres    false    205            �            1259    116929    Match    TABLE     4  CREATE TABLE public."Match" (
    id integer NOT NULL,
    "matchFormat" public."MatchFormat" NOT NULL,
    "teamAId" text NOT NULL,
    "teamBId" text NOT NULL,
    result text NOT NULL,
    "batFirst" text NOT NULL,
    "matchDate" date NOT NULL,
    "venueId" text NOT NULL,
    "userId" text NOT NULL
);
    DROP TABLE public."Match";
       public         heap    postgres    false    552            �            1259    116935    Match_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Match_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Match_id_seq";
       public          postgres    false    206            {           0    0    Match_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Match_id_seq" OWNED BY public."Match".id;
          public          postgres    false    207            �            1259    116937    Player    TABLE     �   CREATE TABLE public."Player" (
    "playerId" text NOT NULL,
    "playerName" text NOT NULL,
    "playerCountryId" text NOT NULL,
    "playerType" public."PlayerType",
    description text,
    "bowlingType" public."BowlingType"
);
    DROP TABLE public."Player";
       public         heap    postgres    false    549    640            �            1259    116943    Scores    TABLE     �   CREATE TABLE public."Scores" (
    id integer NOT NULL,
    "teamId" text NOT NULL,
    runs integer NOT NULL,
    wickets integer NOT NULL,
    "oppCountryId" text NOT NULL,
    "matchId" integer NOT NULL
);
    DROP TABLE public."Scores";
       public         heap    postgres    false            �            1259    116949    Scores_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Scores_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Scores_id_seq";
       public          postgres    false    209            |           0    0    Scores_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Scores_id_seq" OWNED BY public."Scores".id;
          public          postgres    false    210            �            1259    116951    Team    TABLE     �   CREATE TABLE public."Team" (
    id integer NOT NULL,
    "teamName" text NOT NULL,
    "teamId" text NOT NULL,
    "userId" text
);
    DROP TABLE public."Team";
       public         heap    postgres    false            �            1259    116957    Team_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Team_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Team_id_seq";
       public          postgres    false    211            }           0    0    Team_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Team_id_seq" OWNED BY public."Team".id;
          public          postgres    false    212            �            1259    116959    User    TABLE     �  CREATE TABLE public."User" (
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
       public         heap    postgres    false            �            1259    116967    Venue    TABLE     �   CREATE TABLE public."Venue" (
    id integer NOT NULL,
    "venueId" text NOT NULL,
    "venueName" text NOT NULL,
    "venueCountryId" text,
    "userId" text NOT NULL
);
    DROP TABLE public."Venue";
       public         heap    postgres    false            �            1259    116973    Venue_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Venue_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Venue_id_seq";
       public          postgres    false    214            ~           0    0    Venue_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Venue_id_seq" OWNED BY public."Venue".id;
          public          postgres    false    215            �
           2604    116975 
   Batting id    DEFAULT     l   ALTER TABLE ONLY public."Batting" ALTER COLUMN id SET DEFAULT nextval('public."Batting_id_seq"'::regclass);
 ;   ALTER TABLE public."Batting" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202            �
           2604    116976 
   Bowling id    DEFAULT     l   ALTER TABLE ONLY public."Bowling" ALTER COLUMN id SET DEFAULT nextval('public."Bowling_id_seq"'::regclass);
 ;   ALTER TABLE public."Bowling" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204            �
           2604    116977    Match id    DEFAULT     h   ALTER TABLE ONLY public."Match" ALTER COLUMN id SET DEFAULT nextval('public."Match_id_seq"'::regclass);
 9   ALTER TABLE public."Match" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206            �
           2604    116978 	   Scores id    DEFAULT     j   ALTER TABLE ONLY public."Scores" ALTER COLUMN id SET DEFAULT nextval('public."Scores_id_seq"'::regclass);
 :   ALTER TABLE public."Scores" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209            �
           2604    116979    Team id    DEFAULT     f   ALTER TABLE ONLY public."Team" ALTER COLUMN id SET DEFAULT nextval('public."Team_id_seq"'::regclass);
 8   ALTER TABLE public."Team" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211            �
           2604    116980    Venue id    DEFAULT     h   ALTER TABLE ONLY public."Venue" ALTER COLUMN id SET DEFAULT nextval('public."Venue_id_seq"'::regclass);
 9   ALTER TABLE public."Venue" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214            d          0    116913    Batting 
   TABLE DATA           �   COPY public."Batting" (id, "oppCountryId", run, four, six, "strikeRate", "matchDate", "matchFormat", "venueId", "userId", "playerId", "matchId", "teamId") FROM stdin;
    public          postgres    false    202   �c       f          0    116921    Bowling 
   TABLE DATA           �   COPY public."Bowling" (id, "oppCountryId", maiden, wicket, eco, "matchDate", "matchFormat", "venueId", "userId", "playerId", "matchId", "teamId") FROM stdin;
    public          postgres    false    204   ?�       h          0    116929    Match 
   TABLE DATA           �   COPY public."Match" (id, "matchFormat", "teamAId", "teamBId", result, "batFirst", "matchDate", "venueId", "userId") FROM stdin;
    public          postgres    false    206   6�       j          0    116937    Player 
   TABLE DATA           y   COPY public."Player" ("playerId", "playerName", "playerCountryId", "playerType", description, "bowlingType") FROM stdin;
    public          postgres    false    208   H�       k          0    116943    Scores 
   TABLE DATA           Z   COPY public."Scores" (id, "teamId", runs, wickets, "oppCountryId", "matchId") FROM stdin;
    public          postgres    false    209   ��       m          0    116951    Team 
   TABLE DATA           D   COPY public."Team" (id, "teamName", "teamId", "userId") FROM stdin;
    public          postgres    false    211   ѫ       o          0    116959    User 
   TABLE DATA           �   COPY public."User" (id, name, email, "isActive", "verifyToken", image, "hashedPassword", "createdAt", "updatedAt", "loginId") FROM stdin;
    public          postgres    false    213   ��       p          0    116967    Venue 
   TABLE DATA           Y   COPY public."Venue" (id, "venueId", "venueName", "venueCountryId", "userId") FROM stdin;
    public          postgres    false    214   ��                  0    0    Batting_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Batting_id_seq"', 1452, true);
          public          postgres    false    203            �           0    0    Bowling_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Bowling_id_seq"', 964, true);
          public          postgres    false    205            �           0    0    Match_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Match_id_seq"', 85, true);
          public          postgres    false    207            �           0    0    Scores_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Scores_id_seq"', 86, true);
          public          postgres    false    210            �           0    0    Team_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Team_id_seq"', 24, true);
          public          postgres    false    212            �           0    0    Venue_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Venue_id_seq"', 27, true);
          public          postgres    false    215            �
           2606    116982    Batting Batting_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_pkey";
       public            postgres    false    202            �
           2606    116984    Bowling Bowling_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_pkey";
       public            postgres    false    204            �
           2606    116986    Match Match_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_pkey";
       public            postgres    false    206            �
           2606    116988    Player Player_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Player"
    ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("playerId");
 @   ALTER TABLE ONLY public."Player" DROP CONSTRAINT "Player_pkey";
       public            postgres    false    208            �
           2606    116990    Scores Scores_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Scores"
    ADD CONSTRAINT "Scores_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Scores" DROP CONSTRAINT "Scores_pkey";
       public            postgres    false    209            �
           2606    116992    Team Team_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Team" DROP CONSTRAINT "Team_pkey";
       public            postgres    false    211            �
           2606    116994    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    213            �
           2606    116996    Venue Venue_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Venue"
    ADD CONSTRAINT "Venue_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Venue" DROP CONSTRAINT "Venue_pkey";
       public            postgres    false    214            �
           1259    116997    Player_playerId_key    INDEX     W   CREATE UNIQUE INDEX "Player_playerId_key" ON public."Player" USING btree ("playerId");
 )   DROP INDEX public."Player_playerId_key";
       public            postgres    false    208            �
           1259    116998    Team_teamId_key    INDEX     O   CREATE UNIQUE INDEX "Team_teamId_key" ON public."Team" USING btree ("teamId");
 %   DROP INDEX public."Team_teamId_key";
       public            postgres    false    211            �
           1259    116999    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            postgres    false    213            �
           1259    117000    User_verifyToken_key    INDEX     Y   CREATE UNIQUE INDEX "User_verifyToken_key" ON public."User" USING btree ("verifyToken");
 *   DROP INDEX public."User_verifyToken_key";
       public            postgres    false    213            �
           1259    117001    Venue_venueId_key    INDEX     S   CREATE UNIQUE INDEX "Venue_venueId_key" ON public."Venue" USING btree ("venueId");
 '   DROP INDEX public."Venue_venueId_key";
       public            postgres    false    214            �
           2606    117002    Batting Batting_matchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES public."Match"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_matchId_fkey";
       public          postgres    false    2755    206    202            �
           2606    117007    Batting Batting_playerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public."Player"("playerId") ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_playerId_fkey";
       public          postgres    false    208    2757    202            �
           2606    117012    Batting Batting_teamId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_teamId_fkey";
       public          postgres    false    202    2763    211            �
           2606    117017    Batting Batting_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_userId_fkey";
       public          postgres    false    2766    202    213            �
           2606    117022    Batting Batting_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"("venueId") ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_venueId_fkey";
       public          postgres    false    2770    202    214            �
           2606    117027    Bowling Bowling_matchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES public."Match"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_matchId_fkey";
       public          postgres    false    206    204    2755            �
           2606    117032    Bowling Bowling_playerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public."Player"("playerId") ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_playerId_fkey";
       public          postgres    false    2757    204    208            �
           2606    117037    Bowling Bowling_teamId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_teamId_fkey";
       public          postgres    false    211    2763    204            �
           2606    117042    Bowling Bowling_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_userId_fkey";
       public          postgres    false    213    204    2766            �
           2606    117047    Bowling Bowling_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"("venueId") ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_venueId_fkey";
       public          postgres    false    214    204    2770            �
           2606    117052    Match Match_result_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_result_fkey" FOREIGN KEY (result) REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_result_fkey";
       public          postgres    false    2763    211    206            �
           2606    117057    Match Match_teamAId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_teamAId_fkey" FOREIGN KEY ("teamAId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_teamAId_fkey";
       public          postgres    false    206    2763    211            �
           2606    117062    Match Match_teamBId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_teamBId_fkey" FOREIGN KEY ("teamBId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_teamBId_fkey";
       public          postgres    false    2763    206    211            �
           2606    117067    Match Match_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_userId_fkey";
       public          postgres    false    213    206    2766            �
           2606    117072    Match Match_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"("venueId") ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_venueId_fkey";
       public          postgres    false    206    214    2770            �
           2606    117077    Scores Scores_matchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Scores"
    ADD CONSTRAINT "Scores_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES public."Match"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public."Scores" DROP CONSTRAINT "Scores_matchId_fkey";
       public          postgres    false    206    209    2755            �
           2606    117082    Scores Scores_teamId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Scores"
    ADD CONSTRAINT "Scores_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public."Scores" DROP CONSTRAINT "Scores_teamId_fkey";
       public          postgres    false    211    209    2763            �
           2606    117087    Team Team_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 C   ALTER TABLE ONLY public."Team" DROP CONSTRAINT "Team_userId_fkey";
       public          postgres    false    2766    211    213            �
           2606    117092    Venue Venue_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Venue"
    ADD CONSTRAINT "Venue_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Venue" DROP CONSTRAINT "Venue_userId_fkey";
       public          postgres    false    2766    213    214            d      x��][o�v~���>EIIS�Ӣh�=��A������sۙ���w���EI������	��^\��Vm~�߿m�i6b�ZVul�k.~f�g�6�����Ӹ�����xy��W/]�\~������ď��e?ݷ��p=�Vl��׿��w5�oj��ʊ5%з���4��/�����	�0���K�O��y?���p��56�9b��cM�d����m�m�#�-�n~n��]o: x_}8n���A(ҘSK˅��(����w���z��̭�n{s�-�d6����m������^�c�Bg�����|9��3����#r
"KC�1g��J1��t���e��{s�Ɛ�i�������x�ހ	�\�����*�~\?�����j��%�&�Q6۪트�q܍��98Cp�]̉�����������W��+U����ϻ�}v�kPYRXt}x�x�1�e?��mo�5����Ѐ涿��m;}��"v�j��L�S����3�E�U9tg���a�� ���t�_���"�|�������=��f�m>�u�ݦq�6h��v����s�Bo�P�?�����4l����6lT}����w�'��`��F�J�|��8����~{8C�ne�f�~�nzY�2��	,�f=�	���w�W���/�u8�ϗ��9�[='�E&�0�L��K��p�}C�/a���:L�F\nS�m���:D,<c��vv�A��w���f���������ꮈ������~���i7j�~=\�S���s���c��U��7Ps4�*������~�!k�F��<�T���m���/���9R�C�E,��v�����o��c'�!7x��!�>�;�eϏ�i:r�4�(`��B���6���T���﨡�d�H���� {1%GJ-�X�40X ��,g��q���
<i�e��TU�����u.�����p�B�]��c7��W�|9�WjZ0�9#~���&8r�-�C��Z{ժ�Z��{���(<�ο��Um�Q����q������V=����k59T�f*:B4�µn�T@�y����؅Хb.b������%��/'�J��6��� b������3R���x��q���9m�����7�H|�L���w��Ֆ���鴽]����,$#ǌ�2����!��q�{LL�t���G�8 @�6^_DfAq��׿lZ��9�FA�7�O��e8>��d��!ςM��:C�Xd)ұ#5�[�iG�U����9�Φ4��u	��x;�2]�����(tᙛ�K��|9�1�#��|��!�5M�t�A_:�(�������v����+��������n/�����<E8
c�b֮�x[t�sλ-����t����	��/%��2/�| ��c�B����nF�G�����x�C�G�ڢ^m���D`���wB��X�~Gs��x���׹���L�^�US����=O�$I�M�������� &�(�Q��Qp,��j�a�0(�	pw��8���/ G��˿o3w*U���%��:�1�������� ��ϥ��9<��������c��pT@�'�RѿP����GF`ah��UK���B��}�6�G����4f]����Bh�~ �
��!�lm �8����4������sT�5�����#07:�����^'{���}drR�o��$]�xȽAn��[ĩ�d�{��#�PH�o]��M��a7�U����j�fM��I�����p�%�C�%�tQ*2�x�:<�`+x�3�)����p�ہ7�Ѣ��}Uph x���|�N��c��Ͽ��j*.� ���yL�N���O������DE�ČE%�Τb��4z���k�6�8N^i��5�f]�$��M��p��k�jJ��1f�@u	(�-����A�	��/�� ��Z��֤���qt���b�yeG�9������
Tw'J�Am����>l�.�}�:I��e	td�<�^$U�����ﳑƉ�&V%�����L� 6�,
z��މX�H>�H鶟<+*🵘3�������X��kLA�P�KSv���cF�VN�mE�ӹ�/�weP�I��7z���"q�	��qz��/��^`[n��tUS�կ�q{�\��v��#�<���i�L��,@���6Z <ǌ_?�Op�C`dh�F@T����9��)��!��b��a�aA.>аlO�u�$�ǉ֖�k[
�;j\^/���LW��w��XښC����]�o��핆qk�ZE�y��~��[����58=0h#W�����R��G��xO��GI����*.QG�XC��� �[��$+ m�`w�B��$3�׷�P��/�c�3�!JWc�V���5�#Hg�p0	�[�
�yx==����v����~�_aF�M�����|��h�H��_� �p{hR�EP�A���ٶ�q�����H+�8� vX#�s�0��HEu��8îYe+��m��0W���A����y��+�.-J��c��ZS ��(m�I��H?��k�����}9���tg�psCL	�ՕX&��v�F�Y���>_;�~y����ฝ�ůJ���X��YV��r�O�T��@Q����f�-zRqaV@�tK�� r�PF����4?*�yp�;[�슐g�I�-LO�Jl�29�oQ�c�`YR̀'%`lSUg��p��Z`3���k8���>ծtS�"p�δЪ�0�Wb��[gt��u��P��q}��)�Ͽ�6���mQ�OG?o����8��~s�p{�H�x�G�>E���1�2�Rǚ&/7}&���r�o���M�bȍ�0w��Q�%���`��w��{���х��l�۷w��~`oqT�ण�(#��F�&����)�]r6"(��ɘ_��U{��zC�7���x� =nV5��?)U�7�E�<DRɵJ'	8|��u�t�6�����?��о�Z	�2�@;���(��`3�A��K��j�AK#�X��Q"5M�HD�Œ��/Uwb�_r��9�/"�4بl$L�]+[�DI��b��I8�Ih�1��U%�Ld�V���R�|�%CuW���pE�Ba�P(��!&h�Ї3��7���X;+���i�9k�ﰎ��2$a�Z<�;3ñ�A��5�+����pF��S���k��]�Z)f���O|���s\&�q{{_A���]�<���C�cVW��G���h�;C����>^ǫ�ҽi��]%��xW�<薘D7���~�@�>�"�����U�ɟFrn�O�u�*��_���̤;#��e���\�	)e/��R֊�46G��4�y�J�؜���U�$�e�M �r�Mc��<[܇O��]�I��߇������d%kf=�Z�P.����Qn�y�#`��7�:U�Λg����7�>u�e���K�umg�j$�ZN'y9Z�Ԕi��݁E���\~�����T���&�Y�=����+�Z�^m��(���tt]<�Wt�A'A~���\�����tԨ�`�J��/�'�ңb�ϰ�d�Ӄ���f{���\8*�z}�~�I���n�K\�v��A�6_5�Y�G����y~|:��
l�u���3#���j��Oq��|�m$F$S����p���5�vI�X�ɊϚ
LF=0G�+Fw��l{2�͑��Zv6�Ix��e	�Flڑ���ض#I��:v�����_�H�]u����d��R�8v�W�Lb��^V�(����qS4^0kL����+(�<��8�Nd'f�V�Ń>i\��D�%�"k�	si#�`�Y_�>߭�K���b�=�`�6;�
y5e�$k�|�R�F'�`�ͩ�to��?0��\����s���T�zăNi��_�������鈮b��M���N{ǨJ:�|WC�.�,�Lɛ��}p^-ScOf�f�������*W'�2<�۰�:�y���Y�;/��X��DL�h�ƹgv<�E-��1��H5ns��˿;�[E��!Ϧ�B�)$�zI�N���C�˫�+Ww�-�k%A�i�+Ua܆ߦ����    �m�m�/=`�
��Jj;+'Au��m��㼰?�	4�]9�(��m}�5ٯ�Np���q������"\� �D��+��W�H�� ���T�������8���ӵ�Xn��)j6� ,ڨA +�>M�!&��7F��8��m����"�k�R��Jۓ�hr�v�!�Tjg�=}��ɯ���v�z���7-�$�i�H�ۇ	���ϋt�Kĳ�-�|��FM�#�ՠJ��16YE]K����d������0ٿqӯVU)�⤘/r�gk�{�pHW�QN��q|�bK�)T(���r��t�[V=c7_H�,X�s6�(Ii�Ăw=��&��%����x/38l��Le繷�E�Y���������b�W$��hd>�r�%S�#�%@Z7,kb^�]Y��"|�`�f�P���*��/g7����ka�9b�W�ӐW�7�1���!��C[��	��i���5�A�X�Ԡ����2`O� ��)���Қz��;&G}��.�d��t�ئ��]c�V�&�w��(yQ�q��a����;J�+A�;���q�;�߄��G�� �̊޼��(Q��	�0ޅ������6�4�0>�����WQ�Z�z;~���I*�D!R�X���x6�@��t��ű����i�t�$H�ɜ���'��z�4�Ћ��T��\SP~%�q��h�3U��CàC�H�9��>��BȠA0�mqA'#���z�忽A���|޳��/�7Ʉ�fM�j��D�y?�U&��P&ٕ��8�
ťM�2�ʸ�����EؚSو��sJ�г
�-�hl�hR2�S�}f�IDH���&a��7p����!������0��|�[+�;�Gfn�D_�1D�eAֱE���Zɉ��⹿���Y���i�>_���o����V������F[hwJO9f���5�j�%��`���Rz�w���3�|�����	V��-+8xT�jܥ�՗�6�BOF���u�dԼd�ْ1khg��i�xQ��1��ͨcE	hވ�o��-��#m��B�����8�PF�;3	iS�d��[�� _���c{�Ṏ�$�&������${=h�s�Op�0�|w��ܐ�M��D}�|=ǳ�Z��%F��~�Y��(ڍ%k;�%�-h�g �=lY;�3��������|��l��l}��<I�u��5>��&s���j�h��[��s�R�y�"�K�1�c��6[:Y��-����c���_�l�?�୛����(��r���s�LP=O����P��Pɷ*D↺e;O
�po�!���3oD���EȵI/w�v��f�nXS@ι-�k�����M��=�r�I`3c��A�8m���V2?�A�~�F�e#�#6�����t��Ek�Nh:E|�t����b���K>��2m���DQ� ^�jug�e���F!��]��'�{0�؍�:Y�{�݃ޜ�B���uu�������h��BiYON��Z$��՗}c%)�?`��`�f>*�x���YHΙI�3P3��мg7�2N�,p�D�eǍd���MB̺D# �Llڌ �-��&��8�L6��������NHݷ��#�>���+-B�sc�����qOC��'Ok��ŉђ{�SX�3�0�]BK�,�nb��k�n�j���ghR5	��;.�[����Z� /��j�,���t����u�\/J��$ؕ�ȃ˵V�d�^�3{�a�t��ȱy�3c�}�Y�[�?%6=�5+��r�;Z���i��Mw.�����vN�n����dV��w���T�ʮm��ޫ6e�p�U���Z���E��S���A�գ{"pH�g��f A7�j�6h�l�[	��������$�g�苐�Ccs"��	����럹J.�@�o�mW�(���>K`}��,�i�1�V��z+��*�n�@|�"���3TsaLF;�ݑ�Ԡ�<,c��{0��fՕp^L�p�ffd>�b�k8�oZ�����t�4 ۗ�8�̀����Z���7D���n_*�i��k�x���9`���������dE˲]M���h�Ń3�u�s���L��0�u���� �����' �h��(�n՞�0� E�p�ƽ"�Ś�ۋG�r��c��K��#-ƼD��X��\9���� ��/,�s۝�ޡl�A�Y�>�B� �CH�59?҉�sܕ�K��'���f�4Pf��>�pj�P�Ɛ�d�����82��͓��-��$H��w�qbџgW�B�S�i|�A%�]�K�y^��=����%�%�B�gYd���w�y9��8H��[�)K��%�������n�iP��E��q|顱+������\J��M`^b��͸�X�<����1u$Z�
�(`��6�p����!"dT��1����^��h���Z�|�'��yD-����&ҿ�p��} �|�ÜD�`�33��c�J;�Ҽzܩ9�N�G�t|�{R���O�_��&��i�K8ݭ�M���J,yVƣJ��K�/s�e�y�Ҋ4��}kA��AF3L9���*���=Ȏ�|�x����"��Y�!�(ip��t>'��T:���ĕU�g�
��>�ȯ�����/�.=Qkz%�ޡ�_$��Sv$�/�4���.�����|���;�q��97iwcs��4�I�?���G�6����▒tt� �P�-�� l2-���ei���*�'�V��ظٖ�m`�b��w������[��VC�$�Y�����r�s2�7S)>o𜂕9�pO��Y�d�o \�)��z;Sg��x�� S��B�3ɛ�KQWba��� �R�Ř��=:F)���V/W�)�����Y�w���r�uP��A�]�#�f��5�ATL���?1�[�L)���g����)��ϔ=v��QD���@����T����5��73�_��p܁>��H�lV7W�җQ:^k���R�^;��������~�3���R������Y��b�m 6ƹ'ˮ�vy�؇�{[U�\�r���
�}����{�yt!�^�!��7��-{�=Q�l�=G6�݁,n?�!�j�0�'����4nm>/W��	"C�M~#4�J��TSܟ�=o'���]���೉ƀmưE������&غ��\h^�����`�]V���!��t<�X_������Y����˨���� ":*�{d��ء4��oљ"M������	dAG+<no�8�.A2����Ix��R���?����9��1!�Fd4�mbK��%�zL��=(;����eq����.��
���a�2�I%b�S����:Q��;��֋,cD�Β��~}���}�0�/)Xw}�Yj�`�e ���5)�o�ֶ��I�Z5&m��-�[����� �7%S#~�:\��5`��,s��<M"\������>��፞E�2��:��hn� M���f鋸H鱱�2_����Дs2�����)����\��qӅ��Faa�r��_	.<���±ˣD!��v�>Y�o�@i��g9f�o�����@�|�[����h��8ݒ�*��묬�r��o��T�=0�Q�������p��:�Y�l9�����l���N�k�n�%<#c͠q;5h�@p\��\�M/V�u�b�����+;7�8�A�:G��x.�:�v%��xŞ�-(y:Wd�/vO���b��5:svv��ζm��
���˚�by����Ꝼ@��5uF���D�����ݥ�c��a)Ø�R��M��b�$����+O�����E7�o�!�+*e�ӊ��+UBz���m	�ͳ�z��E��4��uGr�V��L7��v�Ѿ��\RLd����/^0��q��T����q�H��d�t�~��P�
��T�W|��%H� u$����L�7�ގ�ўe/J��2��[
��-T���4jo'�D���M��n�F����� ���.7=��J��P:'�#��84-d||@�Ѹ:J����<~ �E⼢�ک�+�a8^��`�={ˬc����������m�}��ş@L� Y  �@�T��sb�ܘۡ%i��eߎJd��M�� /@�	}OY��W�,Y��細������:�L�D�J���cd�FOX�&��D���vv@(��/Þ��s��<c[�lsojST8����>���|-��WY�電<ILO'�	V0�t�(�,t2(�۸@����Ϛ�������\4FzpӉD�QC�2���7�.tc�2�#�Пڴ�r|^�}��6GƝ`��%]x�1���>#p;�%j�d��/c�Y+�W���=}���Iuݟ�����J�B!"Ce��?��!	m�����J�2��&������[�{�<=���cm�aD�$� �n��d!h����}�nz�D�g����P/0j��������q8@�bH#��`�;�5��U]��̙X�"���e�k!�>M���2l�g`������Y@o�k��k����:����Q�?0���|��3+�x����֤D��Lf���ck����������� (2�]��^���>�G�5|�M��'��rE�f1<�x��������ۗa:���p�6/��ѫS�� .�~|������.,7.v��E��Ϗ�N�Mg��8����\Y�4���\2GG�7h=Gv���������x��>�����f������K���V�� g�K�X�D��e{I��0�f�K�Y��t�a�/~gƼ�h�_^����a��'p�l�F�[!3��~�#�w��ϼ���/��A�_��gX��N��*_�����(u���y�TJlË��&���}f�z�����߇��8^u�������[H]���{ɇ���@9l�)���W�SD�5�Ϡ�2� ,��[EC]*)�0�S\⫷B�f�����M`}��.T+���������̀����}����[�����F�C6j݁m���gS(Q�ac��Ȯ�Qh?�ֆ�6~!ʞk]r9ȱ������C��h���4��2Ȕv_}�/�6	�{l�[�Ğ�>�t�ȕ�7�ܚ%1���`�nǃ�7viQ@E�>}�_;�(d.<`[#Y7 w�
�23��g+�c8u�ʤ(�P����~���/��      f      x���[o㸒����eQ�z��9sppz;�/�&Vb%���K�;�~�"Y,RF7��`�y���UźI������6զ��M]��o�������u8{�����i~�.�g^�?����s5|�zڼ̗��ާ�m�����|��?>u��X�鶲)!?O��;��o�4y����]	�8^��]����`Y�"�m[�������8�.��PmU��q���_����'ZRrl���<^w��Y4�rc�5|P�Gu����"2��V�"�|PG���~�^�΋\���շ�;�[�䋴��n��WCO��ڽ��𢼴�ݶ��^o�~��~�a|�\i�Z�m��^��Y� �g����u��_ȯ����*�-Z��~���F�,�G��+++H[��B��6xfr[h \�qK8]�����@���ډ�|h`�N҅6Є1,Y�(4:lgP*�z8��}q���5�1&�[Y�W5�}\�׳:z�@W�K��:��� {P�,�ږ�J^ -	�N��U���ᬦ��q����UГh@o�d���2��:d(��I���z���S�Np�̷��͗?�X/D��C�M���N��pFl�w��v"�{V���sA���&;͏��{�Ϸ�|B,G,/P�	Z_�4�_/���U���`��@�jn�6'�Q�N? �I��<�U��:w��v=h�2
�"�>���_�VL��1uG��Y���Y/ȇ���������6��)����:����7_������y��i��3�������mE�Ĥ����F߮WO�0����J�>�H���aO�]~�K�Z�a����=?A�LS���y�������DP"�U�"���4���Ó{TG\9��8�Xu��B6��Q����,Y_�m[dϱ_;tM��Jȑo;n����t��p{ ��=�:�u��bu�Zfr��Ю���0w(�,���z�/VG������X��Ǌ�߿�c97A�KL� w���y܃"��>��r���(�8S� $��gu{���"u,��2�9>]�W ���Me�Z�_S�ݛ��G�e�W)
�|���a�L��烂�q:Rh��z��3�HG���]�	�Z�����S� �fՉ�v�Z�� ����	��r���	��R۝��B�?�<U �@��yq�i��~����L!�}����v�RN.8��z.�DXb�P@�
#�@�-4��,t�]��/��B�zx�ub䀵yb�����|���i�zl[Rw�xU�W���h�����:��H+n'!'������wR��1Pb#l���v�����v?<,a�q}�PYOw ��vy�i<����]�N���Ѧ�UiWm>���_Sc��[����<��?}e����+���'/J�&��+��B~��+���&��	?N�93ɯ���.7�ɂr9���1�/��O�Sc �Ą�&+ �4x��NQ��s%P�n�-���7�""�w$r�AhG$�v2yg��cV� �&1�A�ԦHZ�V��;�6ՖX�³^N뽪+�b~wR#�g�-K�[��wVIR\���.��V��vޚ���Q9W��h�E�$��ަE~5�`���3\Ԡ,�~~S&/���K�n�t%�(�B��H��X�ZM�B!͂�skrt���Ɇs��LQ���nӤ�����/θ�`N��������֦��lV11�g�u$_������e���G ��'p[��e���Z���DiM�Ɩt�-�F�}'-G-�o�NcU ��.���{�����u	p��?��g��ޝ�*�u���;����<�Y�����4��4����O�0nк>�N9���\���&q�~��4�U��a�!�\�ؕ���o�0�j��U�cL<�t�|��+l���O���t��o[F�L�n`��C�����ҺjQ��ݨ�+��
1��o �8�4m��S�]���&L��腕��]&�FPj���e����Ħ2��;�����'�B��m���:0�K���{�G�\Qt-�j��Lb��uyf`�,�i7�pi�֐f�b� =#���s2��ȁt8��5h���P[�aYk�}{�"�TO��	�ݦ��/o��[iQR@�x�4S�oOw�g�͝�1��jmX*h�U��ֶ����Z[W`�E��:A� 1���M���]�i�Mx�Kb�:G�� !�-!iݔd���[Gvς�[���%����p�}@���mk�
<hqed���	�AQ,��J:E��0QN�_�_����6=�����dU����(�.7�`�2B�`�/�c�:S��8�2?Gg��Ȉ��"k�l�'��_���b\�/n9ǭ���"�Q��iz#�U'�>Ol{��q*n���"�ܤhs�)\�qKz-�Lt��qz�wO���Q\�����&w�78����q�f�Qs�,֕����:mc�:\����Fk��rlQ�m��
�~+]B۔���ٖ� r��4�wF_��w۪���3yA���>r�j�6�V��`�.9�%ņ�x��CZ��'��&��'u��|�Wdk5��p/��x�Mߚ2��l�A1���^yzQ?�^���7t8V�;3i�l⌢FC�[�o^�v����!�%�wjzg��D~ek:0��`�&�z�p	"��e���g��a>�OP3��I7|�'�$��@�%����c�z<�y!d�,�.f`]K��t�K���j�<��,w���V@��X����0�H��^�̐q��k4/N5ٸ�r9�Y����+2ו�6��h���h-إ}o��q��!X�A��].��﬘ ���O������'�ų}�n��d�;F����s�YíI�e�vL�\��=,��ȕj�wB����?�KҎ.qA/�5�y^H0n��6_�ύ+��� �
��܇��+e�\�'�x�J��
w���c��%�'QLA/��M+�f[^O䓹�zZ**<� $�����yL����q)`�~x�a�����e6f���2[��Ns,@l�Ϡf˕�e<�N:��<�J��=Zn�:�yI�p�����l$]�C�p�mX�Bdڧ����e���2Y�!Nе��|x��>U�ө�U�#�c�W{i�ߚ�'�ϗn��3~� ~w��**s��ݴ��)Uq��}�+k,�+J����J���w3�p���҉�W��'H����uJ�t�3�b�*���*�!��`&��1��|V���S"�An&��;H�H�/3�a")ؒ��~��s?uX�8`O�ι��N�h��>m\`���X��d�˷Q2�tvO�
���.�ǂ��	���T�w�(Fn�9����#�_�ɐ5���Zݳ��Vir��'l��۶7+�re���B��A��^� �ϣa���'�rI���̴�^g�+S���-��`�o�@�[#A&� �����T�Z��C�4D�c�UXVt���U½�c��ɾcV�V�^i�m�ǹ4��}b�,z��QG�66(O�gP�����i�=JG���0|�>�4A$�{�Z�\�#�S,'\A�(��Q��fm�^� k?�]���q2��C�l�1mq�L�Y����������VC9��P���?���^7�s����5٢�,�>(`9y����0�qTa���`d	]�+�k���
�W�8�KDC��t�����"G'
�N'��1�E�l�uL��dj4z��#pk��
/^�C�5�c��%�sD�n~�R��EDw��_`i������7B9V8e��H�o����x��Mǋ�~nc�#^:{�d��l�9q4�:p�W�e_&m�.��M����]YC�l:h#��O$6�x��T៣c+�H��Y�~����ɹTE��̅V������9�<p�Jw\��e���硙U���3�x����m��M�f��-ʻz(����[���ԩ����?�~����2�fMz�u���:���4�m
��N}�Y���]�z{H41���[�g�ظ��duO�%�F&'+yB��q�I��.��\:A���gS�������D�����5�(+O�+m[�Q1T@T%�T2W��� �  ������}8uϷ��-�biy�Ƶ<x	3lN���H�b��y�{-+o��_�H�����)�M��Ƈ�
��6hS�e�H�w�uV���,u�[��Vl�VE'�t�����H:4�	��4)��̼փ��Gi����V��4���]дK�)�y����g�zo��3k���l�q��Л��㑆^	��8�0�|)*|'DMz�9���a	̾�WkX;ړ��T����M{X��u��ZL����˽q�	o�Dl�m����~-(Y�-�Z�WqS�Փ�ܾ&Il�^��/�qԩ�D���m����~[%�؃W�{��݄5s�RI�M��������3��.Y���d�YU�z��V�>��g�P�ݫ(���i�ZUH�f/�o�qGљ-��.��������n���uF&Q�EFwٝ����n�O�/�Ó�1pw��;[V�Iq:Mtߕ2�7�]<�^b�,��$Vᚐ����I��:n*v5 �侪� m�%L����ZZ��B�,6!���Lu:�H���W��Fm�������Õ�d��J��r���1.�h
ɭ��M[`��Y�b��"k��7"%A�1髋Jw�
(�i8l�ϸ�e������Vi��}��ϋ�јB��?[�~lS���(��I���A�Lk��M��	���h�m��E\��v���(�JUw��vѻ�xst�6���6�s�������N�!���Y���E�Ab��ێt���HӉ�}�o���BN�W �?u��EA\���'H�~jǳ�@`w����|wZ�x�#_���׮U�N�zW���B
�D��އ�,d�xr�fTәp��mds4��i�L�U� ?;k�~>(�'�i���L�WH#��a�
W����$�Y�{9�t���=ۗo�� \W�`�c�o}�@����5L˼r�똺{�ʞG��;M����i8Ci�/��p���zF�M���=���Y��ڿ࿛S{���F��/p��*𥂿�dkO�ߚ,�欒������c�G�l�]�U�>xαc9�'��>C��*j��~ЌH�5�wn��S�_�M����?"?��8��~��XC$�9|K�C��!�4��������i؝�G�~�K��Y����일Á�����0�8��j�V�tl)Xz��RgP���8x�]MU ���R9�'%�F1�|I]ϙ��Ev�w���@`CosL�m}�m�J���4K�A�C����m?}���@���      h     x���Qo�0ǟ�wq)����,[�2��e/�!.�٧_[큘��|������8$/�G2�X���+�,��4Hde��lȺ��2�r�^������1�Y1�#��-gX���n_�#6��OS.�Iٖ+�]����FVi����[E��⁼ΞL�R�Y$���-���m�� �	p�`D���&��Z85�s�|���x����J�2��3D[0Wo*���O�� � N6i�9�2t�$D~.�u�S�/����)P��i+RBR��]�?�C�43N����Nb��?�t4���>��.�t��	5Ź ����0��@g�NY�!RD8�^���!}�袥t^&� 6�P�@ᤜ��E�m��d��U�\���Zʤzw�T�W<Ew�2���5����l)B4�NI1Z���=dH6|��YU��wF�h�����F~��e�M���E؎�qufc���誛>Cm�����
�F���Ζd|�>�Ur��2h\��n&��?�tB�      j   T
  x�}Y]s۸}f��i�p�6I�x{�t3�����SR����� �m�Q��v)@�W��η�����J�7a]X=g�����O�mVdV��R��U�Y��5[�i�)�m��D����A���@r�mMC�
Ԩ#�8�̰��n]��&�i����̼��+L���u�@?&����koި�	�	df�.����`������V6��ŊJ
�����sSڸ�M����SB�&�*�;L�D�����u�-�v�����)`�s�]�ҵ��ֵE�����V�Z�C���[��Z�r�cۂ¾FԻui�qD�8��|cj�����ıŦ�mk�K��{T���#[r��uI��&V�z ������v-��^��?ט�����>�F/9�	�����u��Y�W"�mj�(�W6=G�A��r�c۝���㰅`��/q�\|�/�_��(�������q�bf��5��֕E����	g�q��jcۍ�W���N-�N��Ak�u�;
ETKF��2�Ef���ª+�L52�ξ�i]A�=����3��o@6L8+k+�P��af���뉜v8��<qӣ(�aH^�w�����."�N}-�6��E
�o�Ȥ�GM6����H���,^ܞ�޼5��N}�V?����a�΃h��r���d�H��Rw,�+�3��[�D�S�,���`]����@�$��%�e����j_�̐ʵ���}Գ#��hU�uM%�ݫ��[54�wI�m6?x�
�5��E��) 3[�W�!�!!���I��A&�Î�d��)��8R_�����Z�{23ڔƩٟd�M��7��9Y��-�� �L`���ae�s��"�y����J����
�v�lp��k�Qt�y�/3Sx�tԿrN!�X�L:jȅ���(S������l��[��S�	wр��h�]�r8Y��������G�`����>��+����#�ӌsc�i��k�@�(��;
�.V�fخ��^��R����gSf�Cb��R�Nv��H���іu_��{5��Y��u�n��?���z!rf�"�U��V.c���l[�Hj��C�0g��%�Ѫ��.V�	��"#qLP�A�k��0QR������5�dWlS-.^'��ck�B����仈�1'8�,�{Ծў�nEWoIݜt\�����q��B��a����|��i�`��pkQ�1 �sQ��*����@��O�R7'7>I��q5O���h	�MRa�'U�oHin�K�L���	e;�s+Ԑ��/��L�z!tUl��m���,�>�WЃ�5z9@}/03M'�+X:�\�rbEl�/J��ҥH�+�/��kpd��y�y�v:�lwoD���.�R%7P��:x��QW~�7���}�R3?��?�S��J�uT}�E�"��q�o[n]@c�C� ��q�\_G#�Èf�n����G}5����'B� "�P� #D>���kS��H��Kg���v�al�b� �~).�<�Np=+�	���74��Y]?��-ReX���}��̞$���c����-6�=j�V-O
�Cǜ���M'�3������=���=����W4&uI��+�Q��0CR�/�B�=��[IqC냨��>A4?/��q)O�=W����SS��:&_>jn`�7A�㮢��;7Fl=�m-mѣ���bը�Gt4����ve�5����d��7���P�!r1�8a(sv#%�u�������n��B��tV�ۤ���(�q�H�>�7�I,mJ�x^(�ww�c��N��1�Fq��8��5�D��Y]'�o;//�x��8��;�ɧ���>I>�{���� ����0���y��a9���+أ�	X���I���x��wby��?
����m�SM�>��n�P���#������=3�<��w�u�4�qϥ�y�4vv��?|�TKz)����B#�Y�,22�3~z�Ѝ4}�kqr���N�׮�gD��r�D6����foZ�jP��2ҋ��8]_۰�׻��8��C�]}g���o��Ч���M��>b�4����{���K#df���mDtY���5��_Ό�03ED]�R��<��1�i<ǣh}�zb�A9⬿w���L�a|z�ˍcٯ�=f�_�p���Ǫ�Eu�L�K�V���"�䣄��}�l�C�ڝQ~���2� �o"���;�J���<��C1}���[ :����&�&G��'U_���'4n�����țvu�A���������5n�%��o	���'��I5+��;�z�� &�	���!�O,���_:�i�_�pQcpa������ِ�}�PO	����s5Uf+3>������h�Ћ`�o��j�cP��K��c���4�>���1�Hq���QW[����	��]�`V)&%j+m�ԓ���t�����J'����~C�-�r�� Uj!@�O%��-�mV+�uji�v��	Sܬ�.~�ޠxN�ߵNĈ_��<�۶��B6<�H%nX�,$��Gi7��.���&��dO�{a���/�ĝ
�p���M`l&��?����Og�Ϲ��+��VN�HN&���ӧO�PM�      k     x�=�A�1E�p�Ȁ1������D�(�l����Cu����7U*���F:Mz��$7V�H���J��|��Rt�d�#*�B����	��_rg]L#��}����5({O�XwE��U�������_���֑�I���x��E=�o��l�ʂ=�}�Yoчm�t�� ����$$�R�l5���*s@q�;�9����v���������ǲ�`��5�F)^�S+�}�MfmsZ{y�&�c�:d��[�+-�sU�n5.�$7G�z����6�A59йGkW��e��� ao�y�DovE���Q��Z]Uhq�g���-5X"o�̮��}]�j���r/Mlu!��z�{`��^�˕P^��Ր���.�&�׬H�F��h�;O��p^���v,Zu�,�t�x�޾�׊��c��:8J��q�N&�����sA��FW�D�ѽC5���A�����f��q{p��0���Ք���2k+��[h^ۏ	��t��ѷq^]u�v(�`�Ϛ�i6y��E����_/�Ԇo�U=��ӷ$�������ݠ      m   �   x�}�M
�0���)zi��2b��1� n�6���B�xz[�Ϭ?����)
[B!�(��ݯ��"���KtoL�F��僣v��8:ǉ���8�'P�+4�x8S�Jpz	���MSK���qv���?��=�P��G�O�:22K��qg�}����M!uC����q'd�ڇx�A{\�m9���8��a�F��zȜ+�>���Zv��      o   �   x�=Ȼn�0@��<+����DAU�
Is��p�[�)�)���R���\����k�<�c=��9��z��2k���p���\7)8����q���M"�[�6?� V�ò��ΩI���]W���]bd�� j��W�Kܭ� �.��i;�}>_{��n/?�6O|�^U�1<bD	e&�	L? �mf�����ƌ�H�"M�KRY*r��.XӴ_նH�      p   �   x���AK�0���#mu��G� �*ē�i��$]�ɶ��ZWDؗ��$��x$+@�TÊ�O���Dm�q�l�"�O?��C�&cr�dkt������������	�-*�[�8Dܜ�y(O��^��S�j�FYmP~�P�ac��~���p�Fs�;��o�+�Zy?��������i�<^���@�f�Gz�0Cq�/���1k�q�f0��	瑷�$I> x�)     