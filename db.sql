PGDMP     6                
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
    public          postgres    false    204   �r       e          0    108407    Match 
   TABLE DATA           �   COPY public."Match" (id, "matchFormat", "teamAId", "teamBId", result, "batFirst", "matchDate", "venueId", "userId") FROM stdin;
    public          postgres    false    206   '|       g          0    108415    Player 
   TABLE DATA           j   COPY public."Player" ("playerId", "playerName", "playerCountryId", "playerType", description) FROM stdin;
    public          postgres    false    208   8}       n          0    108557    Scores 
   TABLE DATA           Z   COPY public."Scores" (id, "teamId", runs, wickets, "oppCountryId", "matchId") FROM stdin;
    public          postgres    false    215   ��       h          0    108421    Team 
   TABLE DATA           D   COPY public."Team" (id, "teamName", "teamId", "userId") FROM stdin;
    public          postgres    false    209   ��       j          0    108429    User 
   TABLE DATA           �   COPY public."User" (id, name, email, "isActive", "verifyToken", image, "hashedPassword", "createdAt", "updatedAt", "loginId") FROM stdin;
    public          postgres    false    211   ��       k          0    108437    Venue 
   TABLE DATA           Y   COPY public."Venue" (id, "venueId", "venueName", "venueCountryId", "userId") FROM stdin;
    public          postgres    false    212   ��       |           0    0    Batting_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Batting_id_seq"', 1077, true);
          public          postgres    false    203            }           0    0    Bowling_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Bowling_id_seq"', 719, true);
          public          postgres    false    205            ~           0    0    Match_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Match_id_seq"', 64, true);
          public          postgres    false    207                       0    0    Scores_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Scores_id_seq"', 44, true);
          public          postgres    false    214            �           0    0    Team_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Team_id_seq"', 24, true);
          public          postgres    false    210            �           0    0    Venue_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Venue_id_seq"', 21, true);
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
       public          postgres    false    211    212    2761            a      x��\�n�}��H�V)Q��6	�� ��v�cɭ����k}�U�(v�d(z�E0�aM�.�.�\����5H� 	�	�,��b�'V��寁����'Y��=/�����"�{��6���ʱ��U"����/yx���B��@��|�ʮ|j��@3�	L�D��εj��*���� .`s3���%!�|��ڌe��6t��䎂��@_�r����H�Rg��8�c�
$��79tj02�9ޥ�a�j��l�iϵ|�9!�8�
��ΧVu���o�,��3ԷHP�\�����6���K_��Qy�B'��$	?��ԫ���qg��,'+IB^xa�û�̠��]��n�g�,"��H��pn+�^n��#��%>��e��r��`��#x��I~�
̼�Y>�J=������1
/C�ky�_+G��g�,���3փz�cټ�����B��7���Xy�"rL���d't������I���榛���������_����"��fE��؃�F��R�e5����	9�-?��'u=��$_g��V��s����L��K�G&��G�U�͹./�����@yF�qx�W����Vh�H�4��<�<R�l��ܫ�C)��8��.�}�O��C��7��'�(�}LC��|������3�:���C�g�W�kN(+�)B����Ya3��d�/P�a�z��]r_����Cp�TJ���2ȫ�tAr{��cX�-"��-���b�ֱ�~+2#��1��0bW��~�˦{j�� s�DJ.ȽLn��q��d�cĎ�ս��8�MrV䄤NVd�G~Zv��צ۩C�ø(p�W�(ht_�H�����=�[1T �u�|�8WJ�rlQh`� �2$Y��u����!�+¨8.�<�MW��Ic�Ȝ��4L�+�R��
�}�&�7�L낁ϡ�Eq(���]_u��& j�Yu���ƽ�N�o��b~�-2�R��	�!qL��`%�w�͋n��# �Z�8.�V*��HPÑ.nA{q��=]a9��9�+�]���Rmx��q��
Yi�u�X4�! ��qD(e7u��]�A��q�ڎ[.夗Z��˸A��8�Rg	i�"ĊɢE�OSs-�~�j��H���ʸb������iävL��{`�Pq@��MO��g!p}��/�`� �Cl�w�#�IuO����9�d���pݡ*��)ܱ�0�B�N5��j���ND+x��4���[�%�0��q��*<���W�羅d$�rw���Q-,�:�ԅ�x�*�@�ͩVr�pN^�
2����;>�ز�CտU�F89c"�k��\xI�eNW��=�\O戅��U�Ы����W5�)sB����ll��~H�?�>����S\WE�x��~�v�Y��3/�9�(�$V�2�Η~��$���<L�B���e�5�Oҿ��Shdp��$ �ũU	�{���<���ݗA��'��T�*U{?���b�w�a�#�̹�~�m��d��� f�󞅸b�S5���u����6+��2Gd"N�n����凼���.�uh�x�+.��	��=�&�]ژ���4~�%�YV� f����tW䓄�S�M�V-��K$�B�a��U94o{��٣cl�[)�|�36]/J�9Gd�fa����@S[�,
R�[�q}ͷ�Asî��T�&���Y5$�S	�Fބ<�#�%�b�+2�67���^O[�1��i�ɱ1fi-C��Ey�!4��5НoCS560�?��um����_�N�v��=�_�H�o���@y�f��e�L�)�󷓬W�AՔ��Q����
�aQ��Ì��nf�i�3/pӪ/���[������e��Y&~�; ���bd��LF������~ o'��z#nJ��%��=!r�-U7�;�Vy����h��)�j45� �� �h�����u��lD�����,H�p�=ϩߧ9��Y���">�S�(!�V����@�!����{�{U��M���2����[q�:�|[��(�7 �uS�I-�ϙT����鰰_UL&�JM�wY����}h[1t��.�`J�����S�%�4��f\Yx���֔r�u�NA�r*W`K2(Rk0�n]���f C~3:NV��N���m3�<X�F�1%��ս_'V��M7�UŔ0S��E��[� �`��4�[s<�Cpt`���O�p�1��A��2M�몺�w�r�Os�S-[���/��)�cw�w:��I��l��Z'�M�� �xT�I5j`]ر�/<�x|��h�����A��V�՚U錇c�?,;����z�!	\��1�d
�H#E&h�u��	�j�j�Ai1��x��p����nO�q���("���F��;��uz!_v��]�r}l�W��ԯ�R��٥�@m�GN؏�R-��o��Y�*gY�|ӌߠ3t�r�Һ��a��o8��]��qύ6LN��R'؜���W$���u��V���*$,�z�ȱ3�n����^����O��S₨"Ђ�]v�kV��v��������Q��Q?�M���������*n�7����e	�Sŷ۠pwk���Scnq����HV4��Â��2t�V�����Z�]��V M�l�1�2��-_Ԡ�-��8�_�آy�,u�j3��m�bh��zE�Y'�n���^�N�"����9έ�x�{���Q�dqZr͏��V�?��vkܣ�z}n��-q����u�q����pZX��(�����(?6j���{jC�oY��~�޵� '��-�\��Ma��&��f�5�:@}����˵f��4�Ef��f�|�h�F\�Xf�^���=_��b�.&��#t�u?�|�MЩ.��m��nnĴ���0�
O�O��*�B�E��?�xd�7�WiZ�
�OG,K��wa���}�۳�)bfyFD�1�Џ��DɄ+�������0�/z8�r�|8�5Q*]�B�{jP����Mc"�����3tO��Q|�����I�+�S_Fbӝ���(��u�,�^�ݎ��)�]��I�۽Z7c4��q���~�ޱT�`�%Y�ZX}�Twmc.l-{uW��<d��fw�LB�]���8���K]�0�֬�i#Cx�����&�-��q���o�ל�=��;[GYi^Y�����g���o0q����q?a���e�A���u<W�i5?���p6��:��h��fK��d�S\j?�3�Q�K����Sh7|3h�����QBH�h��W�=K�-�{uξ�Bh5n\�~��;Z�]UW5�0c8���1�vm.���a��u&M�|����8���'ܮw��E�ѳ�!���:�	w{��_�˪�^�H���qB�����MA�1=�/�%:�Ŗ#��W���I�0[GʐG��wh<��S/߹��J�J�-]M'��*�Ǉ٫5}7W�|��ޮ��;�wV>��n��D�HUM�cWð�[�NhΘ0�: |�AcDoX*��?�vS��p�ؔ�ƭ��vъ� ����!_�8�@�5�gT;��0�5ɥ���E�����+�Ks2��f���I����
lM�7�����=	���K���ȖBxa�� g�^�&L�v��s4����C�\1�u�(	�8���>��lZD�ϋ��#��Usv)r���&_�Ò�-��T�Vn�5�4uV���_�1���a���f9�@s}���
{�fd|e{��D Xi|ܨ�F�6��*E�F�Ǐ��%o�bY�(��K}��MG�Y�ς�n�d�z��9��wDk$�}�����ݥQɧ�ʣ����ui5���4��,�,��m���a��^ռ
Os6pzP��y���e����1�]��Y3�y�=d�������|��`Z��vΈ�eav��<jd�*��Ȓ�_ʻ����(��V�}5m�o�>�7���U4�����v7�=�쟟M,߽�|�����F�g�	�yQ�G�,�V�Յ�ѷU �L<d߿�36],�޺`�����q�~��JN�I|Y�a��W������� 4   �t]ao��&�������۹{jJ����R��&|����k�ä��_�|�F��      c   7	  x����n����w���%]z�;�E'� 7A ��M�������ӧH�EJ6�=�Aυ���#�L�,���� ��Q���F�������gvd�����?��BC����܆����	���*+vk�kߟ�4����.�
�%Az�c��]W���+o�8p��m��T�'6���(D|H|��l*Os���h�uH��������gf���C#�� >nc��PO�qnV	2�	�X�2|QݖceLN����CF��}�Z��r��ژ��}���^걬83ћSi�`&����<���3�fHN^	w��3���Ƌ��+�M�L6��{BrA���W	Y�F%��7W61״H��������̕��:
[��V���)9����C� �©�H�F�	*��H�*�8�]ŭ�T�!�us6tS56U��ʎ�o2q��(@�&D��CWV��p�pXk��B�#��/���̃?���r�a�Uȵ�9
����9���O7΍�U�����c_�d0#�if�]�RIm����_F,���s3i<���$Y�n��W�M�`O�i��;�SUw�.�M-,�wc��t�y�ȇ�<�b)b���K�z�ꦩ�G���]�_�m3�����.]<��Z,�fbT����X��1Ή$��u[��<U"�A�"�N���w�2�������Y@3#L�� #�<��y�ٰ�|aPY9��A�,<�!ȱ5��>��M�(�g>�o^�����VC�;�o=O���8��v�r��֖�g�X�)��Z;�ܹ�|���Ufb/N}����}-�,�&���覿��GC.P�d�r��ۚ��BI^2��Fh2Qd�~��+��y�ё%�!or[sccu�u��|��(/�q56QXqL��p�T^���N������:Ì�������u}�)b�Y��ß�o�],���8��z�C}!����l.����+��Y`�A
)j�],]���T_\��!r�Pq��.����+��`��ͼ��l	w�!s](]��R1��ֆ��S�w�~&i_���	(X�DAE~d?�T� x��N5U�h]����n �ƪ>&���CSmK6]��w��!�CҶ�)�ԆW��?,��<w�u!�_��%�H���m7��4��+#� �+4�4<��O�#��ώ�^F)�jNt3�'��8�uW��:w�5qb�U-K5�b�_:~_�?!�'nm!�v9�R�^�ƹ���c�p�q'�X���eHs͢0[M=n\9�q9�1:�̀M�|P4>�tR��ap��O5_��:�����%�-�X�4T�,��̇�T6�2
a��
l��5�����c5%��+���us�6Yp\v:��5�FJV�����oV8JUp�Q5��b�رF])��_���Xe��[#N��W�O��[b�����Uv��"��)����U��V���^�h:7���7f�K�hu1�*��[4Z��+�8�.w{��L]
"�a}Ns'w}/]Q�t�z�S�qZX8� `|�xn;��?W@���w��H��R/0��L0�� �8Ȣ��rw�}���ᔒe��]ߗ4���D�X��謀1w��z��� x1Ҩ
�^�b�����**rb��~��j�E}����e��_#���Wm;�#����V��Y��+�XI���W�|}eo���Xn���4���,�kn-���ݬ����8Ԭ"�o������L�Z�=��Z�:�6��W��G�||e��(7�L0åp%>������w�Ԏ�=�%�6�0�ￊJn
y���:ȫ���z�_G�R�C�U|9�[t]�"��,݉�wX�
�o����Q3��o��g�j���$Z�^�14o�~u�J����}�N�|a�+��ͭ�N�K!�=1[w'K�Rz��@���Hʬ���^���P���խ�s/4��$Ju���������!z�$�k.��{boL�G�u�b
U�f{m����"������n����n�.+H��	g�T�U?ԏp����JT.��0\�����n"?ٵ>1Fz�(X���@c�g���K��!�4pSŕ�o�ض(�pQ��#��~t��dZB[�mݯ�jM��F�@'��,ː��5.����Y,O5��RKX�;�>,����`��A
l��Z6�{QE��D�j%�E�~�����ͬ�u_���bĆ�Afoy����5���t������Fk<D�IÕ�y������{����F���ʃ�^����Jq�"�H�n"�Xq�ݼ�D�~
'j�����^E�I�cv�za�x�S�s����@�������{�hL      e     x����n�0����rZm�KԘ���f�M�,F"��G���-��������9b
����iBɑO'�MXj[�B媀OӜ�0*%�Oӕ�ꮪ�	Č(�YLI	����Q��1���w�."�n�\U>��!,���ޗʴ��G�;�"]�K�����1]B�����W��>@t,WN���\G�E���:���}#`4J�d$�*�+�{E$�"ւ;�"8�?VyYQ+�/pH(��z���Z�\�ň�~<A�P܍      g   u  x�}W]o�}��
����N��d�{��-
#�6iId����=Cʢ�..� sF��3g��۫h(t$^�mO���{��O�UGNlۊm�A�l�^5޴V�ɶ\%{>K���^t�,	�'�Ӵ*�Z�z�/�(�����#���͎X~�x��.�u��Nb;9���p;o��t�W�Y�!_B7����{�MUC���ʻg'�Z��q�UF�gU\�q�j���Q�Vg
״d �2X��9=_LTFS-^�-�.���;��V����u��{}�NE���& �	����CT-UC�:8-��%�g��?��9,���#���Ov{
���m��w��(C�V����W@�8��{G,�.�o����.<H��Խ�X��es��}���N�A�k�2��F`�l���]E���K�2�wN��V'�	����C�Wi�\��i�Z�݅&P'���*,��vgT����C�FG��xꐺS<�3(���H2�C��a��<��������xHPޏ����:���*A�!��6z�~�w��  	�n��@��R5Z�aJU��KQbݡ�1��S��������yw��X2����5=��X�n���b,o�S�9�θE�mx��;-�
��5�rp�m\?���z���Cz�8�x��*���P�x�cF}����Q�����j~�Fޏ�P��#׳���eO�S�����NnG��vG?�=D��K�Dh�4Ȁ���o�9a��'�Y�V_�O!h��[�Ȩ7�'	���R�s�������d�|���G�F��9'��ń3^G�V�t[�3��f��<��F�|�+]C��(����V�b�h����C��v<'P8=*�r
Dn��HrSpa�� �`��np�I:�^���Ij:���䜔f��e"��Cߋ���~~�w�4c��4��:�i���S�5�Yd�E�-�F³�y�0%�s��6�ޟ���x��yZ�{0�|a�|��R�
#�Nes>6�X�=�D �:ۅ
�h�#��.م�y�U�� �\�*_w&��=����[�3p��˭�gP8H E}���<x@%]�@�Pm�5�Ƣ���%{ƨ�mɰ:���Ex��@fϷ�jd��� �a�$�%�p*�oP��\�Y��&�j���*3b��qaFR��h����@������=,`C�ڏ���ަ]�A�$�F(	�V3(��7�>�m�2�cȤ��[[&�����g��+|K��DB�aρ�8xa�|��]���([ж0�[ln�m��oP�ɔK�廣c�,4>F����G�&y�c�򵲷�B>^��F�1��B}�,�b�C4C��s���6x��X�ϊb�*�ɕO��Ǯ���ЍO�a{|��ӵoo���n��ذܧ��	�k���#�*����lhnwHFȊu��	��$8��S����#U����}�[���<���_�K>d���-�m��ɉ>É���	^�7�v3y������2vO�`8�g�4��e]��q%|�\������Q��=�xb�:�PaM�䨲%�6��'bQ˙�.gna8�S����&�1��)�G�+5v�?�w��E'd��C���z�݇��j4\ڴC�ыEr��*��|��;X���3�r�������GH!��(���#�>��oI�zGyE��b �e�J���8R�L����m�ۡ���0EvCf?�o�v,j�QH�6m�>;��昨�M�G�GOxF�$����D���t!n��mO$�����m�ͷ�نTCap�$zR���j��R�'��޴a���p���*8�k�;���|�0g_`[�'���م�N��8�3�qĵ� DaF�yP	m�n�0R�'�>���*�F<����u���z;B��`���ۧO��$���      n   �   x�=�IN1E��aP<$N�A4-*!Jl�?��}��=2������	]�9+��
|�����\%L=�a�Y"�?�;�!l>$�9�TꙈ�䙊{{�-�w�~�����bU(;��>@ڀ:�O�R�f����=k{-�P���v�����|��P�2��{��Zo=��Rw��k�`��.�8����%>"�`��K-7�ʩx��u&�f�����uƌv�:�}B�?i�V      h   �   x�}�M
�0���)zi��2b��1� n�6���B�xz[�Ϭ?����)
[B!�(��ݯ��"���KtoL�F��僣v��8:ǉ���8�'P�+4�x8S�Jpz	���MSK���qv���?��=�P��G�O�:22K��qg�}����M!uC����q'd�ڇx�A{\�m9���8��a�F��zȜ+�>���Zv��      j   �   x�E��r�0@�ux
lI�'��e`:�)�xwܐ������y�:Ӆg��W?���8yT��n�uT���j3��2��(} _��r`��HU�eU��y�ej;d��r���괟�ٝ�%�c��/�(C�YTX@-���M��u� �z�6z�����������Z����h�n�0��2�f����<?7	��ッ���O\�����"l�qƆa��0H�      k   �   x�34�L��MMILJL�t��<�\8�s��+,,��� �"��� �"3�(��М3;?';�$��J�`��[�������(��LJ�KO�)-*�t���k22�,(�K� �r���ddr��I��c���� �@]�     