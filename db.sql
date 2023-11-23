PGDMP         /            
    {            db_sb    12.1    12.1 O    q           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            r           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            s           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            t           1262    107867    db_sb    DATABASE     �   CREATE DATABASE db_sb WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_India.1252' LC_CTYPE = 'English_India.1252';
    DROP DATABASE db_sb;
                postgres    false            u           0    0    SCHEMA public    ACL     R   REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT CREATE ON SCHEMA public TO PUBLIC;
                   postgres    false    3            }           1247    108214    MatchFormat    TYPE     N   CREATE TYPE public."MatchFormat" AS ENUM (
    'ODI',
    'T20',
    'IPL'
);
     DROP TYPE public."MatchFormat";
       public          postgres    false            %           1247    107869 
   PlayerType    TYPE     [   CREATE TYPE public."PlayerType" AS ENUM (
    'Batsman',
    'Bowler',
    'AllRounder'
);
    DROP TYPE public."PlayerType";
       public          postgres    false            �            1259    108391    Batting    TABLE     �  CREATE TABLE public."Batting" (
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
       public         heap    postgres    false    637            �            1259    108397    Batting_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Batting_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Batting_id_seq";
       public          postgres    false    202            v           0    0    Batting_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Batting_id_seq" OWNED BY public."Batting".id;
          public          postgres    false    203            �            1259    108399    Bowling    TABLE     �  CREATE TABLE public."Bowling" (
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
       public         heap    postgres    false    637            �            1259    108405    Bowling_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Bowling_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Bowling_id_seq";
       public          postgres    false    204            w           0    0    Bowling_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Bowling_id_seq" OWNED BY public."Bowling".id;
          public          postgres    false    205            �            1259    108407    Match    TABLE     4  CREATE TABLE public."Match" (
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
       public         heap    postgres    false    637            �            1259    108413    Match_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Match_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Match_id_seq";
       public          postgres    false    206            x           0    0    Match_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Match_id_seq" OWNED BY public."Match".id;
          public          postgres    false    207            �            1259    108415    Player    TABLE     �   CREATE TABLE public."Player" (
    "playerId" text NOT NULL,
    "playerName" text NOT NULL,
    "playerCountryId" text NOT NULL,
    "playerType" public."PlayerType",
    description text
);
    DROP TABLE public."Player";
       public         heap    postgres    false    549            �            1259    108557    Scores    TABLE     �   CREATE TABLE public."Scores" (
    id integer NOT NULL,
    "teamId" text NOT NULL,
    runs integer NOT NULL,
    wickets integer NOT NULL,
    "oppCountryId" text NOT NULL,
    "matchId" integer NOT NULL
);
    DROP TABLE public."Scores";
       public         heap    postgres    false            �            1259    108555    Scores_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Scores_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Scores_id_seq";
       public          postgres    false    215            y           0    0    Scores_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Scores_id_seq" OWNED BY public."Scores".id;
          public          postgres    false    214            �            1259    108421    Team    TABLE     �   CREATE TABLE public."Team" (
    id integer NOT NULL,
    "teamName" text NOT NULL,
    "teamId" text NOT NULL,
    "userId" text
);
    DROP TABLE public."Team";
       public         heap    postgres    false            �            1259    108427    Team_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Team_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Team_id_seq";
       public          postgres    false    209            z           0    0    Team_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Team_id_seq" OWNED BY public."Team".id;
          public          postgres    false    210            �            1259    108429    User    TABLE     �  CREATE TABLE public."User" (
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
       public         heap    postgres    false            �            1259    108437    Venue    TABLE     �   CREATE TABLE public."Venue" (
    id integer NOT NULL,
    "venueId" text NOT NULL,
    "venueName" text NOT NULL,
    "venueCountryId" text,
    "userId" text NOT NULL
);
    DROP TABLE public."Venue";
       public         heap    postgres    false            �            1259    108443    Venue_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Venue_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Venue_id_seq";
       public          postgres    false    212            {           0    0    Venue_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Venue_id_seq" OWNED BY public."Venue".id;
          public          postgres    false    213            �
           2604    108445 
   Batting id    DEFAULT     l   ALTER TABLE ONLY public."Batting" ALTER COLUMN id SET DEFAULT nextval('public."Batting_id_seq"'::regclass);
 ;   ALTER TABLE public."Batting" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202            �
           2604    108446 
   Bowling id    DEFAULT     l   ALTER TABLE ONLY public."Bowling" ALTER COLUMN id SET DEFAULT nextval('public."Bowling_id_seq"'::regclass);
 ;   ALTER TABLE public."Bowling" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204            �
           2604    108447    Match id    DEFAULT     h   ALTER TABLE ONLY public."Match" ALTER COLUMN id SET DEFAULT nextval('public."Match_id_seq"'::regclass);
 9   ALTER TABLE public."Match" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206            �
           2604    108560 	   Scores id    DEFAULT     j   ALTER TABLE ONLY public."Scores" ALTER COLUMN id SET DEFAULT nextval('public."Scores_id_seq"'::regclass);
 :   ALTER TABLE public."Scores" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            �
           2604    108448    Team id    DEFAULT     f   ALTER TABLE ONLY public."Team" ALTER COLUMN id SET DEFAULT nextval('public."Team_id_seq"'::regclass);
 8   ALTER TABLE public."Team" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209            �
           2604    108449    Venue id    DEFAULT     h   ALTER TABLE ONLY public."Venue" ALTER COLUMN id SET DEFAULT nextval('public."Venue_id_seq"'::regclass);
 9   ALTER TABLE public."Venue" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    212            a          0    108391    Batting 
   TABLE DATA           �   COPY public."Batting" (id, "oppCountryId", run, four, six, "strikeRate", "matchDate", "matchFormat", "venueId", "userId", "playerId", "matchId", "teamId") FROM stdin;
    public          postgres    false    202   �b       c          0    108399    Bowling 
   TABLE DATA           �   COPY public."Bowling" (id, "oppCountryId", maiden, wicket, eco, "matchDate", "matchFormat", "venueId", "userId", "playerId", "matchId", "teamId") FROM stdin;
    public          postgres    false    204   �       e          0    108407    Match 
   TABLE DATA           �   COPY public."Match" (id, "matchFormat", "teamAId", "teamBId", result, "batFirst", "matchDate", "venueId", "userId") FROM stdin;
    public          postgres    false    206   #�       g          0    108415    Player 
   TABLE DATA           j   COPY public."Player" ("playerId", "playerName", "playerCountryId", "playerType", description) FROM stdin;
    public          postgres    false    208   ��       n          0    108557    Scores 
   TABLE DATA           Z   COPY public."Scores" (id, "teamId", runs, wickets, "oppCountryId", "matchId") FROM stdin;
    public          postgres    false    215   ��       h          0    108421    Team 
   TABLE DATA           D   COPY public."Team" (id, "teamName", "teamId", "userId") FROM stdin;
    public          postgres    false    209   ��       j          0    108429    User 
   TABLE DATA           �   COPY public."User" (id, name, email, "isActive", "verifyToken", image, "hashedPassword", "createdAt", "updatedAt", "loginId") FROM stdin;
    public          postgres    false    211   ��       k          0    108437    Venue 
   TABLE DATA           Y   COPY public."Venue" (id, "venueId", "venueName", "venueCountryId", "userId") FROM stdin;
    public          postgres    false    212   q�       |           0    0    Batting_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Batting_id_seq"', 1408, true);
          public          postgres    false    203            }           0    0    Bowling_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Bowling_id_seq"', 931, true);
          public          postgres    false    205            ~           0    0    Match_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Match_id_seq"', 82, true);
          public          postgres    false    207                       0    0    Scores_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Scores_id_seq"', 80, true);
          public          postgres    false    214            �           0    0    Team_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Team_id_seq"', 24, true);
          public          postgres    false    210            �           0    0    Venue_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Venue_id_seq"', 24, true);
          public          postgres    false    213            �
           2606    108451    Batting Batting_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_pkey";
       public            postgres    false    202            �
           2606    108453    Bowling Bowling_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_pkey";
       public            postgres    false    204            �
           2606    108455    Match Match_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_pkey";
       public            postgres    false    206            �
           2606    108457    Player Player_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Player"
    ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("playerId");
 @   ALTER TABLE ONLY public."Player" DROP CONSTRAINT "Player_pkey";
       public            postgres    false    208            �
           2606    108565    Scores Scores_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Scores"
    ADD CONSTRAINT "Scores_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Scores" DROP CONSTRAINT "Scores_pkey";
       public            postgres    false    215            �
           2606    108459    Team Team_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Team" DROP CONSTRAINT "Team_pkey";
       public            postgres    false    209            �
           2606    108461    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    211            �
           2606    108463    Venue Venue_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Venue"
    ADD CONSTRAINT "Venue_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Venue" DROP CONSTRAINT "Venue_pkey";
       public            postgres    false    212            �
           1259    108464    Player_playerId_key    INDEX     W   CREATE UNIQUE INDEX "Player_playerId_key" ON public."Player" USING btree ("playerId");
 )   DROP INDEX public."Player_playerId_key";
       public            postgres    false    208            �
           1259    108465    Team_teamId_key    INDEX     O   CREATE UNIQUE INDEX "Team_teamId_key" ON public."Team" USING btree ("teamId");
 %   DROP INDEX public."Team_teamId_key";
       public            postgres    false    209            �
           1259    108466    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            postgres    false    211            �
           1259    108467    User_verifyToken_key    INDEX     Y   CREATE UNIQUE INDEX "User_verifyToken_key" ON public."User" USING btree ("verifyToken");
 *   DROP INDEX public."User_verifyToken_key";
       public            postgres    false    211            �
           1259    108468    Venue_venueId_key    INDEX     S   CREATE UNIQUE INDEX "Venue_venueId_key" ON public."Venue" USING btree ("venueId");
 '   DROP INDEX public."Venue_venueId_key";
       public            postgres    false    212            �
           2606    108469    Batting Batting_matchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES public."Match"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_matchId_fkey";
       public          postgres    false    206    202    2752            �
           2606    108474    Batting Batting_playerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public."Player"("playerId") ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_playerId_fkey";
       public          postgres    false    202    2754    208            �
           2606    108479    Batting Batting_teamId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_teamId_fkey";
       public          postgres    false    209    202    2758            �
           2606    108484    Batting Batting_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_userId_fkey";
       public          postgres    false    211    2761    202            �
           2606    108489    Batting Batting_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"("venueId") ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_venueId_fkey";
       public          postgres    false    212    2765    202            �
           2606    108494    Bowling Bowling_matchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES public."Match"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_matchId_fkey";
       public          postgres    false    2752    204    206            �
           2606    108499    Bowling Bowling_playerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public."Player"("playerId") ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_playerId_fkey";
       public          postgres    false    208    2754    204            �
           2606    108504    Bowling Bowling_teamId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_teamId_fkey";
       public          postgres    false    209    2758    204            �
           2606    108509    Bowling Bowling_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_userId_fkey";
       public          postgres    false    204    2761    211            �
           2606    108514    Bowling Bowling_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"("venueId") ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_venueId_fkey";
       public          postgres    false    2765    212    204            �
           2606    108519    Match Match_result_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_result_fkey" FOREIGN KEY (result) REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_result_fkey";
       public          postgres    false    2758    206    209            �
           2606    108524    Match Match_teamAId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_teamAId_fkey" FOREIGN KEY ("teamAId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_teamAId_fkey";
       public          postgres    false    209    206    2758            �
           2606    108529    Match Match_teamBId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_teamBId_fkey" FOREIGN KEY ("teamBId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_teamBId_fkey";
       public          postgres    false    209    2758    206            �
           2606    108534    Match Match_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_userId_fkey";
       public          postgres    false    206    211    2761            �
           2606    108539    Match Match_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"("venueId") ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_venueId_fkey";
       public          postgres    false    2765    206    212            �
           2606    108571    Scores Scores_matchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Scores"
    ADD CONSTRAINT "Scores_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES public."Match"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public."Scores" DROP CONSTRAINT "Scores_matchId_fkey";
       public          postgres    false    206    215    2752            �
           2606    108566    Scores Scores_teamId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Scores"
    ADD CONSTRAINT "Scores_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public."Scores" DROP CONSTRAINT "Scores_teamId_fkey";
       public          postgres    false    2758    209    215            �
           2606    108544    Team Team_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 C   ALTER TABLE ONLY public."Team" DROP CONSTRAINT "Team_userId_fkey";
       public          postgres    false    211    209    2761            �
           2606    108549    Venue Venue_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Venue"
    ADD CONSTRAINT "Venue_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Venue" DROP CONSTRAINT "Venue_userId_fkey";
       public          postgres    false    211    212    2761            a      x��]Yo�v~��#yA$%R|�`n��� ��\(�.�K�����ؿ>�<ܥ�M����O�óoz�����tb�m؆���dC[�~!�"7����7��4�Ƨq�y>^���o��_/�v�k��qs��������qӳ������[ߴ��j�o���i<o_���C��!�O�� ����~:���z�+l8.`S�fB�wB����ܯ�����O�[]��p�n7>�@����������5�����Ļ��x=OW�^c���˞6�
�|~ܶ���q{ޏ/����/P�*��:_���w��ۄ���Bӻ��ه�U�}�����?Ξ�>t�I�uMW�����t�ހD�$rI�PY������~�>�պ�MҢl�Mϫ��q�Mӷ� �Ʈ������
J��qN��T�K޵���W����uܾ���ի,��:<!����O�k�pͫ�>��Մ�����x���(��ݣZA~�S�����s����h���5��r<���@������y��@��J��_[�S+l"֗c_��m���G����t�_�Z��>�����������y|� �Ó�7�t#E#i9�~����y�=�1B72ْͰ�7�hZQ����X���F�NS�Qq��:w���t��&�ͼ����"��}_���%�ġ��a���:�Z\n�����U:D,<!���v�C�0p]�w��ca��c�.���W��¸[��^�Ư8�8�&eگ��x�x��L<s\�jXpG*#�/�;B��"d�Ak��#�~������r�o�"%8� �b9��;�'��46k�x3Y�;9��Sw�����-{~�N�9 G�q�@��g@@��a8�7��5��l��^c�`/��H�G+��8�����8��X�'��r�lZY~��y?���eRؿ��<��ox91v�w�
�/����
E2�ůeM�G�vh6�Z+�ZvMO�q�yھ�g����9�lM8�:8�Ў#/���x}�l��a��^�C��gv��%D�)ܪ�H
H6��.���v!t���X��bl��z����	��}����ЀB�rD�(����и&$ڃ#��r�E��m�x���A� >�*��sf�h�IZCRG��|��.��^�k�ǌ�2����!��q�;LL�p��
�#D |��/�@fAq����6=��t#���O��e<>��l�ˑg��p���$��ؑ�н��ʑ�Z�H^�"�MJC]����M���!��:���Ḁ�B��ɶ��ϗ#���0���g�?h��V��S���%���+ɩ.Yh7NQ
��˿q|��N���/����Q��0v=f�xC����C�s�m�W���uz���'�����4��t�|u�i��M��~�j��݌��//����4M�z�G��7]��n��?�e�k`Q��m|��Op��:y^�&�2I@z64]�
�O���<�F�$��U#��#��(*Q���`YS� C�aP>����q�v�_@������0��TȦ^�|��4�xT�Rl����0Q?�^H.���{��^iܯ�I!�Q�jdt�H�.�E�:@�o?������R-�������	�Z�{,%:kҘm���
���e�8���������tz.��vg;~(g�R�#.j�6}G`nt�m���[Hb}x��Q:V������t=L��#��l�����e?��z��B"A4��뛿�g�n:��p�-U�ݚTg�b��i���J��5J�\d8/��u||��F�g]棟a���6{�3�9�G�k����@����z�w���_��&�d\A�o�󔛝��/����*Y�-��J�\�b��4�ŧ��|Rkbg�4L�]3;Y�8�w�v?�����(|��:P[C��Ɔ��j� V�ro��UD PZ��
V����q����b�y�%������n�j�Am����6�X]��t������Z9�K�H0�
4?�:w�jxl��Nh'�;�*%���@dz��d�XУ-�NĲXD�YEJ���XQ���Ĝ�\5�ŨUcz�r��2^��o3���2n*b\�j�
����
O*�}�D�1�Z��G�`��������Ô��3�骸��2m���= �i�^���7E��<߼��+����K���}�'?x�@�hX���O�<���?$G2[��y�e�xGò=���#`=x`}��6U /�����r>���|��{x�K{}h0��wW��p;��ݚO�V�"r<�t����v?wNڂ�C^�QE)R�G��8O�a@I���*.R��)��.:]A ���IV �n��.�-�KD��Ї��2}�V��ΐ�(���:��i:Kn�p0	�[�
�y|==����v����~�_<a$F�]�����U>ST4�$���	��z��=ԩp�"�� F��l��8��F���x$t�%\�
T�9��R!�� 0R��%�"�b����U�2�*hs77Xo�|�����∾�^�7����r����u���$o�E��|��Y����S�aU%��.��9�7�ׇ�+g�+��� ��6~�2��5~�eu)/k�TL�.��	m�l�A�*.$d�Z
��;�Ժ��ݤ�Q�ρS�ؙ�$�BN
��鞈���er�koQ�c�`YR,�J��غ�N(Wp��Z`��̫?���J�*W�kDx��4Вc��+���m:`�*믩��>)����@������磟������8�����p{�HG48�Ӑ#���ω�N���cE������|�߷��U1��r�;�mk���3XD�����^e�Tt�)*�b�v������EuN:J��ҙ4"0aҖ�$və���K�'m~AxvW�5�4q6T{#�q�|��YU�
~���r�[�Ty(H%�2�$������}T��|�>*'����p��|K�(|!��VZ-	�&�0�� �j�B-�X��Q"5O���Ɖ%Ei_��,�(�d1)�]Dy�Q��K:&�T�R"2�d�����ꅕp�вc�1�FT�Ș!�b?�.��t��@UW���p��B���I��!&���3��7폏��b�X;+���y�9k�ﰎ��2da&��E����X���5�-�ǧ9��r�`�|�a�f�R$���O\���s\&)q<{;_A��6]�4���C�cFW�G��Ik��@����6]���҃n�5]%�l(�AUK����~z�9��>�*��P��U�ɟ����*�°���P��Ĥ[#��e�ΆR��)e'��RV�C76G��<дG�kl���*F���ƃc9����P�PZ,����.�}��߇������d%kf<���P.����Qn�z�#`��Յ:Y��ͳVG���T���
��E�%���5d-�z-�S����jJ�S���*��
�q.�Q^Iz*`�gS�������xSF-u�6�A��D�i>�*�O�+������snv.D�Ujj>*TP�J%F��F鑱�X�4c� :��0�"����
�N�t��aF�[����iy��͗^r��H=��5-�O�(ϫ�]�j(��ً�e����WXD�w�Db�d2||<Η���Z.�$�V������Aè�h|�莴�m�F^�9���L��f�	/-5aY��;�H��wlڀ�$QL�	��S��莮�⮺RZ
d�x�O���+F&1~� Z��X�M��)/H��?�jq

;O���	'�33i+��^�t�p����{�����ش�j0�dh�P�V�%�R�Ǟe0�/Ǝ�BNM�$�Z/_�ԯ��J=�msZ;�;���:܁K�R�s0�<�^ȕѨG��^[�e�����p�t)��h�4�w�;FU�]5�y4YX���#9{��ƞ̸ͬ$	P[�U�N�xP�q�t*8�ϳ·^\��8+���/��랙������F�q��SX�e�1��p9Or2��G�S!Y�K�t���]��^ݙ�L��X f�r�m�s~�~<�_�?�k    ���Z�%oX��3r�5N�W�8����@CRӕS����@��ևZ����� w�0^g�����.¥ 	��yU��G:��Np]��*??X�b�VO�jb�i?��M�H<0�����4Ƙ�_���eaW�i\�����V����FS��V�rㅨ��&��#ް�)T��=�"��`΋4�}���U~^�Cl"�thl��s�5j�IT�*1��du-e���]���x�Ia�c�_������I1_�d���4
�4��^�QN��iz�bK��W(���rV�t�[Vcw�H�,X�qv8�Q����@�&�싷��K<�����E�3��SoɉJ��-e{q;����	�H�0��ȼ7��S��G.�M��vXV��&����E���͎��Uq_�n:����kf�)b�W��W�7�����!��CY���=�n���5�A�X�T����&�'`����a{l�u=�&펙�Q_�C6�8B_��lS��Mޙ��h��;�E�����Xpp�0��f��ꍕ����s�ȅ�X�&��o�q�J�kbD/-�fJGT2����w�p~�횾/���xh�Y��X1ȨK-v��A�$�V�)6���j<Z�J*��sQl=주`t8g�[gN���3a�wM�b�;v9���[	���6��̕�����έR{��v(�D��kl{�@�Ed��]����S"��і�=��B�IƧ6�p�F��	���eқY �s��Ƅ���Q(6m*��9)���K��a+Na�F�x,0�S�E��U�iQEc�G�������9&a>iڗ��d���$���Cp�vr���k���)Ol��o��ؕC����yY��je'"W���;�g͊��o�ra_0����,.Z�*�s�K���mT��)5�Xl~~�ثŖD��~��R!�K]��.2[4�d�M��� �ZB%X��>����Qͫ��jV_v��35lDm�&�Ғ17%c҅i����&�d�c4f�Qǲ!в1�f�{�/`G��-,�V)����q~�$8nb������ne�|�O���Y��*R��؛ W��g�3أ�@�O�|�;�竿�G����nR��0L�g���׳<QjhP-1Bo$p{��_X�n,њ	-�m��@�_�_ �zآ�6������(�|��l���]��<n���k\��)Lbm-�՘������.春Bi�"�K�1�e��2[*Y�������e����lRw������p`�z���F�Hw��:y:����'���vouB(s����"pCݲ�]&�w�����r���7��A��ڤ��H3~�l7�� w�Rg]�͵�|���&Y�NǼ,�qX�ǯP<NzjK��L��jP:����{�h��� 5C�7��v��x+4\�tM�s�t9_�_����y����nQ�A��5��&�e�MbǴ���r.Ws��2�Dtf���N��^�{Йs]�65>ޖJK��v�Gn������'�E2^C�7V�r�FKQ� V)i�Q!�+8\�'M %gҞ�hp��] �;��3 (��e n���s��N��Yh�P�6#b���N�N*�EsQWK�^g'���T��@��B��!���X���!r���c����pqb������zF�K(i�M��:��mW�#�TM��`�ƌK�V��9]k����_�3t��uW�����ECg=v%(r�b�![�W��ym�._k,rl����(E�4�r��Ħ�ne?T�sְ=��z�%y�݂�u�
vp��S l6|m�d2����;:d�+hu׶�O�T�4sE�k)T��i-�r�Ģ�Z�d��qu�ڞ0��A#�B�d������h�&*�� ��h�����,}R8hlN�1?�֓�t���E� ��[a��4Ҧ�h���xXWa�i�r�p���f��č	�Y�v~ � z���Ǧ��T����c{d55�/����,�����ϋi*�̌(_lp�Gg�M�� �>�/���e�6e`��0������ ѽ�ڗ�i�fz�~�Ԡ��c!a;�7LQ�/+��2,��6����yNp4���C,��0g�$���#ǯ{hj���>A��`��p�<1�V�ԇ)�DP�����+X����xT�#�+=��abу�Ř��⸿�3��+�!;�:�E�%tj�S�;}9�2��Y�aq��:�t�w%�ҡ�IM㫞;(Ѓ>nj���Ɛ�d�ܩ��8
��͓��}���N�UƉEwn�]a��E�k*��e�����C�y\�\�P#,A��!K�L�X�Ν�S,~��D�e��?|p�C�DV�^^:\jN��(_�Ǘ��t?���	�K)ὸ	�IL��WցǱ�;8��Xo_!f������T?D�����<��ѼB[�+�Љ��j!Y����=�#j�����}V!��
7!��{p���s���xh���J��
��1�)�N�G�T|�O{R��0OP���
�x�a�Kx�[���փ(�,��Y�*��/��.K/OJ+B�K
��aI�a*�_�V�/p� ;n2\�y�}�#���f����
I��fp��9c�̤�q6P]&��Z>�VI\��yE|�W��<��p�\�+y����"qM�4#�t�����7wYd�����c0D�މ���sf76��	O1�����<��1�l\ ��䣇0��ݢ�Ia�Â��l\�6�Ϋj}m�����m)�*v�}穫��q �KQ�j����4�X���!'8w "3��iÀ���I�{D���������Π�3q�8��"���j�9�H^7^��a{���6��K�c�����w�:x��LQp���c��6;��:jT�y|SA�cl�f]�b���W�bX�bxTZ��Dҷ�R~�Ϫ�Y�S�1�)��	����3���k]��������<V�4, ~���q�p�LS@g�Z�#�������ZCOhܕ��jԪh�	&��Gn���C���,u�C�$a\�,��z�`c�}���Z��!G��`�c���˰\�żBhި����.���Ӆ�A�����-{�Q�l��D6��nO��V|5c�UƞO:�6�֫����ʦ�4�J��TSܟ����z�@L�.Y��\�d��c�1l�b��7"�	���,JQ�>a�5�
Hj򱃒��e��p}q��vk�#�q���~�3	 ��Cƪ�J�����)BwJ0��N�N�:Z)�p��Yw	#�E�qؒ��)e����M��7����@va[&t�h0��:��� ��0-���>��L�K��23R�Uʨ&�����-p��:V��;��֋cD�β��~w}����y谘/)X{}�[j�`�2�c����ꅔ�ֶ܍�`�jL��K[����3��1#�ޔM���jy&׀�I�(9}M�_������>�����E�2��:��hj� u�"�,�q��ac�%]�[��Фu2����)��E�G���_=�B�"�|��\8�3υc�G�B
ۉ���(�6
8�#���)�K�-纅joьf/���-IR�w\gdE�ku|[�xAe��%�<_]>�`�^�b3�a[����9f6��V��@�um7'	��X3��N��I 8��:�æ��8kH�>}�1�J����-Pؠj�#I*�V<�`�P��X��jO����-������`ZLv�Fg�l����lږ��b��yY�R,��\&t\��H�&���~	�U������]�=�+�
�yPJ��i],��l���z�ϭ�.�)P|+iNQI�l�RT���҇}�NQ���V?[��H��̣x\�$�r���|����5�7��M��br���	&v��gy#˕`RT�D�#M��S=�]�B�+�NS��}W� y�t�#Y���f��vԸ��,V����H/�R8�l!�
�N�fҎq�L�Zu�>���@Xh���B��r7��U��Iգ�`�~$��Kf4������A�cw
�Q�(m�v�\��0/V_0��e��������ND�졂�i���S�8��1 ^  Y�0�?7&��v(IJ|�"�Qi�l��	���aB�QD���=,�/������J�:�t�D��`?f؏Q�=`��6x,&��xv`0�L���:�%������:��`�=x��:Ñ�a��I��A4O�^]�k�r$�=�'X�`�#G%d	'���q��2�O��	z�����Ec�םX@�5���p���%�ؘTKd�w�S�6W��8�/@vӦ�ȸL�����K�;�3r7�^��N���:fIZi�24��YT��ٱq���k���`��S��%$	��A�9��V)R���ĳ9����fuK��"͏��X���/��|�����M�      c      x���K����ϥ��B2$�(��؅l�`/�
���Ϊ��C=�_��$2�����7Q��`��������7զ��M]��g�>�~���k��a��~�8�o���W�����s5�5���y�/��A�O��<�7]����Do�l�meSB~���iwT����҂ w%��x}< rw���#�e��h�m	����o��x�x*C=�eT�W�ݻ:~SZ�?A�����cS�o��{���� &�+.���=����En��÷���:�_�]��ы�y�K�׳�>^v�Ay�|�V3�m��j�iV��^��V ��9��m�÷�0��+-W�-��w<�$�l�?��Wc��u�^�U��Ek�/P�sè��2�c�}eeiK�Q�q��Ln��+<�`	��p�T����U;q���I����0�%�F���JEUg5�/�{�8Ƅz+��������zVG��
u�^��;`j������%��HK�S�Dłoh�y8�i�{����0x�$��7Y�y�̻�ʫ�_f��n�o�5��b��8�m�n�n�� ��-�e�����4��� ������a<�\GlG����N���8잆���2����j�ַ�8M�B%��*_�e��r�
M5�x���퍨B���Ԥ�`�Ȫ|S���|��S�e�RR�ѯ�+&c���rǬ�M{����pzV��|��}�v�D�ax���⛯���d�M	�<����������ۊ �I����]���ab/��}P�v7Þ���/�k���sc���	3M��	�z��;�9@�hVm����gа>�0O�Qmp夓�c�QW�x�G�&F82�d}��m�=�~��5Q+!G���*#(ӹ���lb�<��a[��ej��}�C��^��Dܡ��P�8��r�X%�۲���{`�"+6������,1q��zO�q���|�/���o���Lł������#{�Ա��T��t_�[�C�6��j�j|M�wo�2=�Y�6\Q�X(`w ��3kd��2��
r��H����ֻ<�	F:�~h(H��B��,��x��6+�N<���:�??N`T�ø�LN��@�����������*=΋KM�����}�j2����vR�K�8���r�y��a�-C�*������H��veB�`^���a։���i"��#���:����mIݙ+�U]^u�b��r"@l�G7�x�"������rV.��I]n�X@�M��-����媞�����!���Bd=i�|���E��p3�{�w�;A�WgD�NV�]����?m~M��Jn=N�����+�7�^�^�>yQB5��^��=^-�5�\N��qZ͙I~u��7w��N��Iu�I|i���hu &�6Y����%t��ƞ�(��v�n�uHl��1�#�cB;"9̰��;����0�)�6E�R��T�1��������*pZ�U]	�zѯ8��hYX�ߒ���J��L_]w1���v���lW�ʹj�w@�-�� iD/h�6-�iS�F(P��e!���2yi�T_:uۦ+�F�z�D2d�%� �:��кh*�
i��[�۠�%�M6����d���.v�&u���~W�q�Us�T��W-_~>�6��f����=�#�R� Օgw.�$l<2 ��?�ۺ�.��֐�z$�$Jk*4���m	5��;i9j!�|3�t��lu9�0Gp�˼?�H�H�K�{u�u�=3���V� ��h�Y���͂�n���������0<�|"υq����u��w���u��7���sU�y�:=�!�z��������c�F��`]%=��I�����Vk:�4�K�J�.����e$���6N`:��o��BZW-��uuE`��\!&<���G�����wj���ׄ�3������J��q�l�3����@&{��q�C[��dQh0��R5X�Bti1�|O#�#�(�+���AC�6�I�ֹ.o�L��7M��s.M���_,�g��q sN&9�G���@4Wj< ,k-�o�R���I}�;��m�|Pz+e�J��Ҹ�{F���|{�S�8Sm����Uk�RA`�:6��M4�h����b�k-��	B� ��p�n�o����N�l�k]��9b�� �m	I�$����:�{L�R�6.�\䮈�����En[;W�A�+#;N���Z`�wW
�):���r*���v��i�S�=�'�
4ܤFqu����2�}	��ՙb��ٖ�9:��X�FFL�Y�e�P�8YP��.��%�xq�9n�m����d O�A�:Q�ybc����(U�Sq���U��&E��N�b�["��h�e��ޏ��{�{�޸��B�����dhX5����9lWV���0[���f��l���G�i[���"~F�7Zcu�c��n��5P��[�ڦ��8�϶d������3����Vm&��(��rm����Us�y�]v�I,)6����В|�=�w5A��=��<���"[����{�� ��l�֔Yh�f��a���`�Z�Ӌ���2�e���;�ñݙI3�`�g5�ܲ|�Z���=�ha�(�H�S�;�`�$�+[Ӂ��7q��K��K��.�~�?�^�y|��i�L���>�'QUڐ�(�xU�w����y�Y �fAt1{m�Z����\��V��Ug�ˮf��|�B��IE����e���P=^�yq��ƥ����2l�4�X���$��<7E3�SP4Gk�.%�{Վ�m�r�W�r�6�xg���_~b�G־8�/��cw��%K�1w�Wĝ��nMb-˷�`�����HG#W���		�b+�^��]�^�kr�^H0n��6_�ύ+��} py:�!��JY,dF��5��w���u:��,c	�IS�K!mӊ�ٖ��d�x�����
�(��`���<F��ёA0.,���6lr���ƌwt�Bf+�>�4��[�j�\9_�����C��S�����rC�A�K"�@(&7?\/�e#��k��m�r<"Ӿ^ӻo,�G#�d�8A�2��F��]�s�T]�N�BW �D��_���>7�/�ϗn��3~�?��^Y���Y�nZ�����8�qѾǕ5�%�N���b��~�;�z�]�Q��ǫV�����v�R9��̵X��o<�Jq���+��$z��:�U�"�T��m��	���:���L`�H
��:�����_V>ؓ�s�o��=Z,����>�!sK2��v�6J���ɫ�~+�|,�N���NxgP�`�b�(�3��J�1����Y���ս���J��^x�;a;��ݶ-0��Y�+[^~�:5ȭ�"lh (|�����zȇ���$=̗�3�~{�}��L�ޒ�p�ƃU�!n��`�D����O�R�wjI�k�67��k����O���{ ��]�}Ǭ:�V��~�B�si�����?X��SG�66(��3���R��{�sπґ 2;_$�π��&��v\k��|d�a�儀+�����)k���%��#ܥO��'cM>4̆�G�$�:X=6p�Ƙ=4F�2�q��"ט���j�z�L�Ɋ��k�EDYx�-}P�r�1 !�a6��RY��6��WbײL!|��ql����]��u�i�ME�N��N��c�����C�\���h� ��G�ք�^���`32jL�(�K�t��8��2�+���HO����� 7o�r�p�td��*����x��Mǋ�~nc�#^:{�d�^y6��8	�L����/�6\
�y�l�{�#�+kH��Bm�_����&���*�;:�r�$p؛uX������AU���\heq��	\�����V��r� .�/}��fV�g�BϠ�	'k���7q�1��(��QRᩙ�>8lWݩSk��t��o��<�5��u>6�#����)��:�MgfCXv���!�hĀºnuT��b����ս�kKd�:LNV�-�I�����]H)�t�Z�3� *�2i{��ّ�"/�3�9�k06QV��Wڶģb��.�JR�d�`�5n� �  �����p�0�o��+Z������ky�f؜0_呼�:7v��Z4V�η�D�H?���Sn�"5�G(i	2l�8�$��m�j��f{�Y�^������O��N��Xc�j�th42:iRtu�y�9���%��J=i*!�]дK�)������g�zo��3k���l�q��Л��㑆^	��8�0�|)*�&DMz�9���a	̾�WkX;ړ��T����M{X��u��ZL�����}q�	o�Dl�m����~-(Y�-�Z�WqS�Փ�ܾ&Il�^��/�qԩ�D���}�����Z%�؃W�{F�n9Q��wF�ɦU����uΙUK�,e�Zi�嬪G�Jj�i���)ԭ@�j�J��w��V��K�[n�QtfKw��l0,v�Ňbu������$�����.��0�y�m���~xR5�.?p��3w�
<)Nǣ��N�R&���낇�K��Eb���#\��c�=iP�MŮ���W���$���6R}YK��T��&$�w�Tg����4�}�hԖ��nM���}>��$3��5P�����p�q��i($�B.7m���f�I����՗߈��
Ĥ�.F(�+8����5�q��ru������L[��9���1�� ���ئ�γQ\��ƃ�2��Xi��}(��3����zq�����T�?QЕ� ��;���w����6\m@=p��6�s���������D2��ə��YD$V��H����4�h������ӧO��d/O      e   �  x���[o�0ǟ�wq9h��K����e�K"F.���ӯ���0)5�Ë?�_Fy��I��!�l��f�?�"ʺ��V�dW��K���W{�������)o�'R9��Q�#���ه�n$"uWo��F`=a1�GP�-����Sg�pMYd+�>�R|-1��f8���)l��
X�������&�)�"��<�>'3��f(K�f@<%�Q�\�g �t��ZQe�p`$/����ka��"�@Y��*�F
2B�<��C5Ky9`8%��P���H	H��M{�1btDZ9���$F��t��0�o����_�.K�}tB��$��-P��q�wf4q0��(C�`2b}������y)N����r��2Ҥ���ɮ,��*�|�I��W]�S=y����ˉ&ו'��}�$!�ng�e���̈���wU�[*����u�      g   �  x�}X�n�8}f��i���;I�2�qz�i@�,ڤ%QiR����=EJ�2,� uJG"Ywڷ�v*��gr���v)����S0}ѐSG[�b��|`�9g�SUkj+�dY��<���W
�^��W"�O2���'��b���Q��<��+=�����X~Mx�R�T�yu���b7)�_Q��Mk�it�&h������w���a��o�C�5Ay���}]j�6,�J���
S�f�F�yx˖�B��LK�5�������0AM�x��|d93�퍮k#6��3/t���
���@�"�}��A�T�ao���D�\�T���sX��+�FX7�v:����]��wj�Q�n���m)���	f�bq�7�uA|C,�rf�!��Q�FbQ�H���go]�:Uj���MX����[���MA��3�K�0�w	d���Vg�zU�!h�f����r9h��Ȗ�m�+O�X0b�E�YF[��ި�&�<
����A�N�I s�޾E�9~u� ���=եڷ��i-"��̼J#��8J
{!ΐ��GGZ�~��UD( �,M�'{���xI0�*`��(��XېB�)�ٻ�>÷��]�*����?&��uj�:pc9V�L��iu�-��:��i���D,�_��Cl���r�L�����P�m�VQ���z3��[2��'G�B6��V�+y?�L���\�5%�ݠ�{��
m�x��6r7ș�Cql��C�,�<j$2���g��#�_F</:���|�^ë�"��~�J(�R�oe{)q�_�ߖ,������h_i43��=c��pf�+�ȕJ����������g�����.Q�� v���eV�f��Qk]jq�f�ڱ� s:t.�,*����'�ی3�n��\A
�+�0��;���[]����4�_��Q9U�MT�w�L�N,XD)���}���_l���{QT�:~n3j2���lK���,�>L	����е�( \<�9O+߶Z>���ܩ�F�q�J��݀f�u\�PЩ��(B���xdY�E93�Vc�y.�$��ӽ�軗�x�{�5��8������$���BB<��.F�9TZ���hs�Q��<ce_�d�:��Mx�p�L�o���>P��s�c�D�- s
�_�D/D�`1?OC���ۅ�̀�s��V�5H �R�CGC�D5�aE�~�{�l�5�J�i�r�l5��Q(<s�3Y�+�~?�L�����2�D�&��	/l��a�a�O��	q��b~ޑ�!�Ңm1����n���vqޠ �Q�K����S�,4m�#`ۨ��I�fem~�dxe����0��	e�sӧ`A1����1�y>gS���t�Sc�k:+�����DU:1���
}3�t����w�ӥ����_��(T\��/��;AcGT��bY.��n��#QV�ü���KK�3^�9�`o���N6H�no��������*��T�/c&�"�ɉ9É���f^�n�����xu33L��.�Ǚ2����ݦ7Z��Fx8���*��Q��f�Ĉ�dD�5e����D�2����Z��T�R�f�kۘ���l!�������OZj�V��_fߢ3�������O�ވ�f�p(��6u_aDl�"�0teU>����?��fYn�����<B
1\_P����[��.�z���^1o��o	���h�(�M%�z�wP[�;��=��Hj�����=��($Z�u�r1*&*�Ԣ�c&� O"D�Op��p%�]�Ǣ`�3����hu�-4�"U��6���w�:����R���x6��BR�Pɗ���9�k��6�XN:��.�`k�NʯF#,�
��T�9(g|�8�l|�B&�݃Nh$�P�v#�>�qh���y�"�#��8�z{@���F��P>E�y{ͣ�=�^�'$"�u��0����Qa�5r=S�f%�p�kx�m��4����$�� OR�����4V<�U�(M�@?a�[_�ߐG��#�c��J�LV���b�I
�eP�.m�̻�ZF��q�\��N���x�D�AO][���1O���('�4W�8 ፯��v@���F;�%q�x�����<��*����tf�s,�'�I>2��#���0�η���"�i�����	��Q���w�\�fz�������XG$W	M�C�݈�^z�� ���G��H�EU��Js˻��FTN7s�.��f>��������� ��      n   �  x�=TA�1<��D�ǉv�����r���w�������ru��Ϸ!k�5>�)�T%��j����1�eD.�>"lD��=��w��8
��%u_BQ����'�$�*��L����P��~=~Үd��m`<�>�C��`��+�1vu��x|���֤�ju���������9��}���T� �E�t8���s�vz���@J�����]`��%�F1v�%Uɾ�&�msZ{y�V�ظ]@�+v���U�i�����W/s�i��y�Q��[Z��A֖��ۃ;Yj�"���Y>F�K�cuMa�![�#-%,!k�ʭ���/r�>�F��&6�`�}���=`�c/��JyW,x5��i'�k�"_Uq߈>�6Z����?��c�o��E���cPN�;}�����!�`E�}ޤ�^{��Ŧ(�3��ڛ�etg���"�ק ̚`J�'������TJ��e�������3�_��?�>��      h   �   x�}�M
�0���)zi��2b��1� n�6���B�xz[�Ϭ?����)
[B!�(��ݯ��"���KtoL�F��僣v��8:ǉ���8�'P�+4�x8S�Jpz	���MSK���qv���?��=�P��G�O�:22K��qg�}����M!uC����q'd�ڇx�A{\�m9���8��a�F��zȜ+�>���Zv��      j   �   x�=��r�0@�ux
lI�'H#���8����q�Ec,�`)O_f��쾓���ca�!Չ�&�NJ�������))���8{���&�X�8Uj��)?Y���sYZ��. [�{_,��˨�W����@�l�s:��@R�e؇}�I'+�\����I�~�k��yw��yڹ;�(��0���2v�����2��a:�1���s�����`��5M���H�      k   �   x�����@D�ُ1��Ti���6v�n؇A7�^T�{�9S�in����*��ͭ����,o�h<74�.�R�f���-=	ǉ!��"���y�J؆��<�s[��wo��Lcp��B���8��uk]��Ā��ԑy�&��6���v��a�p[1��R׏X     