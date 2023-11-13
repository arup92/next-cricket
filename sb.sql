PGDMP                     
    {            db_sb    15.3    15.2 H    n           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            o           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            p           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            q           1262    16399    db_sb    DATABASE     �   CREATE DATABASE db_sb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';
    DROP DATABASE db_sb;
                postgres    false                        2615    17637    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            r           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5            s           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            P           1247    17639    MatchFormat    TYPE     N   CREATE TYPE public."MatchFormat" AS ENUM (
    'ODI',
    'T20',
    'IPL'
);
     DROP TYPE public."MatchFormat";
       public          postgres    false    5            S           1247    17646 
   PlayerType    TYPE     [   CREATE TYPE public."PlayerType" AS ENUM (
    'Batsman',
    'Bowler',
    'AllRounder'
);
    DROP TYPE public."PlayerType";
       public          postgres    false    5            �            1259    17697    Batting    TABLE     �  CREATE TABLE public."Batting" (
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
       public         heap    postgres    false    848    5            �            1259    17696    Batting_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Batting_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Batting_id_seq";
       public          postgres    false    5    223            t           0    0    Batting_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Batting_id_seq" OWNED BY public."Batting".id;
          public          postgres    false    222            �            1259    17706    Bowling    TABLE     �  CREATE TABLE public."Bowling" (
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
       public         heap    postgres    false    5    848            �            1259    17705    Bowling_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Bowling_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Bowling_id_seq";
       public          postgres    false    225    5            u           0    0    Bowling_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Bowling_id_seq" OWNED BY public."Bowling".id;
          public          postgres    false    224            �            1259    17681    Match    TABLE     4  CREATE TABLE public."Match" (
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
       public         heap    postgres    false    5    848            �            1259    17680    Match_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Match_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Match_id_seq";
       public          postgres    false    5    220            v           0    0    Match_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Match_id_seq" OWNED BY public."Match".id;
          public          postgres    false    219            �            1259    17689    Player    TABLE     �   CREATE TABLE public."Player" (
    "playerId" text NOT NULL,
    "playerName" text NOT NULL,
    "playerCountryId" text NOT NULL,
    "playerType" public."PlayerType",
    description text
);
    DROP TABLE public."Player";
       public         heap    postgres    false    5    851            �            1259    17663    Team    TABLE     �   CREATE TABLE public."Team" (
    id integer NOT NULL,
    "teamName" text NOT NULL,
    "teamId" text NOT NULL,
    "userId" text
);
    DROP TABLE public."Team";
       public         heap    postgres    false    5            �            1259    17662    Team_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Team_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Team_id_seq";
       public          postgres    false    5    216            w           0    0    Team_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Team_id_seq" OWNED BY public."Team".id;
          public          postgres    false    215            �            1259    17653    User    TABLE     �  CREATE TABLE public."User" (
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
       public         heap    postgres    false    5            �            1259    17672    Venue    TABLE     �   CREATE TABLE public."Venue" (
    id integer NOT NULL,
    "venueId" text NOT NULL,
    "venueName" text NOT NULL,
    "venueCountryId" text,
    "userId" text NOT NULL
);
    DROP TABLE public."Venue";
       public         heap    postgres    false    5            �            1259    17671    Venue_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Venue_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Venue_id_seq";
       public          postgres    false    5    218            x           0    0    Venue_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Venue_id_seq" OWNED BY public."Venue".id;
          public          postgres    false    217            �           2604    17700 
   Batting id    DEFAULT     l   ALTER TABLE ONLY public."Batting" ALTER COLUMN id SET DEFAULT nextval('public."Batting_id_seq"'::regclass);
 ;   ALTER TABLE public."Batting" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            �           2604    17709 
   Bowling id    DEFAULT     l   ALTER TABLE ONLY public."Bowling" ALTER COLUMN id SET DEFAULT nextval('public."Bowling_id_seq"'::regclass);
 ;   ALTER TABLE public."Bowling" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    225    225            �           2604    17684    Match id    DEFAULT     h   ALTER TABLE ONLY public."Match" ALTER COLUMN id SET DEFAULT nextval('public."Match_id_seq"'::regclass);
 9   ALTER TABLE public."Match" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    17666    Team id    DEFAULT     f   ALTER TABLE ONLY public."Team" ALTER COLUMN id SET DEFAULT nextval('public."Team_id_seq"'::regclass);
 8   ALTER TABLE public."Team" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    17675    Venue id    DEFAULT     h   ALTER TABLE ONLY public."Venue" ALTER COLUMN id SET DEFAULT nextval('public."Venue_id_seq"'::regclass);
 9   ALTER TABLE public."Venue" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            i          0    17697    Batting 
   TABLE DATA           �   COPY public."Batting" (id, "oppCountryId", run, four, six, "strikeRate", "matchDate", "matchFormat", "venueId", "userId", "playerId", "matchId", "teamId") FROM stdin;
    public          postgres    false    223   AY       k          0    17706    Bowling 
   TABLE DATA           �   COPY public."Bowling" (id, "oppCountryId", maiden, wicket, eco, "matchDate", "matchFormat", "venueId", "userId", "playerId", "matchId", "teamId") FROM stdin;
    public          postgres    false    225   �       f          0    17681    Match 
   TABLE DATA           �   COPY public."Match" (id, "matchFormat", "teamAId", "teamBId", result, "batFirst", "matchDate", "venueId", "userId") FROM stdin;
    public          postgres    false    220   ��       g          0    17689    Player 
   TABLE DATA           j   COPY public."Player" ("playerId", "playerName", "playerCountryId", "playerType", description) FROM stdin;
    public          postgres    false    221   ��       b          0    17663    Team 
   TABLE DATA           D   COPY public."Team" (id, "teamName", "teamId", "userId") FROM stdin;
    public          postgres    false    216   �       `          0    17653    User 
   TABLE DATA           �   COPY public."User" (id, name, email, "isActive", "verifyToken", image, "hashedPassword", "createdAt", "updatedAt", "loginId") FROM stdin;
    public          postgres    false    214   ��       d          0    17672    Venue 
   TABLE DATA           Y   COPY public."Venue" (id, "venueId", "venueName", "venueCountryId", "userId") FROM stdin;
    public          postgres    false    218   ա       y           0    0    Batting_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Batting_id_seq"', 677, true);
          public          postgres    false    222            z           0    0    Bowling_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Bowling_id_seq"', 457, true);
          public          postgres    false    224            {           0    0    Match_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Match_id_seq"', 39, true);
          public          postgres    false    219            |           0    0    Team_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Team_id_seq"', 12, true);
          public          postgres    false    215            }           0    0    Venue_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Venue_id_seq"', 10, true);
          public          postgres    false    217            �           2606    17704    Batting Batting_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_pkey";
       public            postgres    false    223            �           2606    17713    Bowling Bowling_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_pkey";
       public            postgres    false    225            �           2606    17688    Match Match_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_pkey";
       public            postgres    false    220            �           2606    17695    Player Player_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Player"
    ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("playerId");
 @   ALTER TABLE ONLY public."Player" DROP CONSTRAINT "Player_pkey";
       public            postgres    false    221            �           2606    17670    Team Team_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Team" DROP CONSTRAINT "Team_pkey";
       public            postgres    false    216            �           2606    17661    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    214            �           2606    17679    Venue Venue_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Venue"
    ADD CONSTRAINT "Venue_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Venue" DROP CONSTRAINT "Venue_pkey";
       public            postgres    false    218            �           1259    17718    Player_playerId_key    INDEX     W   CREATE UNIQUE INDEX "Player_playerId_key" ON public."Player" USING btree ("playerId");
 )   DROP INDEX public."Player_playerId_key";
       public            postgres    false    221            �           1259    17716    Team_teamId_key    INDEX     O   CREATE UNIQUE INDEX "Team_teamId_key" ON public."Team" USING btree ("teamId");
 %   DROP INDEX public."Team_teamId_key";
       public            postgres    false    216            �           1259    17714    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            postgres    false    214            �           1259    17715    User_verifyToken_key    INDEX     Y   CREATE UNIQUE INDEX "User_verifyToken_key" ON public."User" USING btree ("verifyToken");
 *   DROP INDEX public."User_verifyToken_key";
       public            postgres    false    214            �           1259    17717    Venue_venueId_key    INDEX     S   CREATE UNIQUE INDEX "Venue_venueId_key" ON public."Venue" USING btree ("venueId");
 '   DROP INDEX public."Venue_venueId_key";
       public            postgres    false    218            �           2606    17769    Batting Batting_matchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES public."Match"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_matchId_fkey";
       public          postgres    false    220    3513    223            �           2606    17764    Batting Batting_playerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public."Player"("playerId") ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_playerId_fkey";
       public          postgres    false    221    3515    223            �           2606    17774    Batting Batting_teamId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_teamId_fkey";
       public          postgres    false    216    223    3508            �           2606    17759    Batting Batting_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_userId_fkey";
       public          postgres    false    214    223    3504            �           2606    17754    Batting Batting_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"("venueId") ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_venueId_fkey";
       public          postgres    false    3511    218    223            �           2606    17794    Bowling Bowling_matchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES public."Match"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_matchId_fkey";
       public          postgres    false    225    3513    220            �           2606    17789    Bowling Bowling_playerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public."Player"("playerId") ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_playerId_fkey";
       public          postgres    false    225    3515    221            �           2606    17799    Bowling Bowling_teamId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_teamId_fkey";
       public          postgres    false    3508    225    216            �           2606    17784    Bowling Bowling_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_userId_fkey";
       public          postgres    false    3504    225    214            �           2606    17779    Bowling Bowling_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"("venueId") ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_venueId_fkey";
       public          postgres    false    3511    218    225            �           2606    17739    Match Match_result_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_result_fkey" FOREIGN KEY (result) REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_result_fkey";
       public          postgres    false    3508    216    220            �           2606    17729    Match Match_teamAId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_teamAId_fkey" FOREIGN KEY ("teamAId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_teamAId_fkey";
       public          postgres    false    3508    216    220            �           2606    17734    Match Match_teamBId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_teamBId_fkey" FOREIGN KEY ("teamBId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_teamBId_fkey";
       public          postgres    false    3508    216    220            �           2606    17749    Match Match_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_userId_fkey";
       public          postgres    false    214    3504    220            �           2606    17744    Match Match_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"("venueId") ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_venueId_fkey";
       public          postgres    false    218    3511    220            �           2606    17719    Team Team_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 C   ALTER TABLE ONLY public."Team" DROP CONSTRAINT "Team_userId_fkey";
       public          postgres    false    216    3504    214            �           2606    17724    Venue Venue_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Venue"
    ADD CONSTRAINT "Venue_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Venue" DROP CONSTRAINT "Venue_userId_fkey";
       public          postgres    false    218    214    3504            i      x��]I�$�r>W���Hn�ex�aC6���`��ݕӕӵ�j�Vϯ7���y"��@����_E���������ȍh��i7���!~���?���6o���p6/����]������?.���4���r�O��u?\��Fm���z=���n�M�*]@��tn۷��0aY������I�q�N��i�-ݗ7K��I
8o�n�)7]W�O�����u;}�>�����h�%���x����e8�i��F$[��ߧ��8pV������jT�,��4n��×��~��'���h�@��YN���_�S@��-�mT��|�o�����V���L��5��&z��^���w71�(6HOUuWp��u�����y�L����"��ϗa����x����ʛ�ܛ�+����|���j���B	�`C_�}>��8�.��~�v��,(	'n��)`��2w��UȄ~�4C��RE��}:�.��������H[Z��D[���/��ݪ�����w&n�L��l���Ϸ��<l����#�j6��5ʚ�ǻ�L��B�Q[GR­�|�ǳ���靘f�hv�c��2kd6���~�&$�qo���/���xq,��<YlO�K�ꢀ����a�pD�D?�b�M%;."-?Ň����o��%<�O/ν1+T`t%�lꖵ�����0�ޘ��ԑ�����=M�k@���F�x��ѱ�LՇ�i ��!J���p�f��}��5c�-�`'����s	����Zȯ��̅��Jaw?�f�O*�t�[	x.�����iD�H�	#K��F	���7�����l@�:i�dcy�T�@�� /�� �튔x7���y��ksB�.��pzgK����JDu��"����Vm��񴛘��@�+���Չ�����M׺�M�<<o���������v:���2��; �m�����
�Q����lRnj��c��WR�S����'�v?X�|ѕ@�Z|�ZW�)8�ܡq�bo2�~=����|���!�YZ�^��T�O�xm�7�$8�͚ˡg������#z���o�@�f^Y�j �\�lɶ�,������<٢��6��a���d5��z;[�@\0��i�5E�'���Kd_���j�k��)@ժ�&;KR���n7���j�)1�ע߿�r������`�����~��J��U��Ɔ2��Ά�;�ld�d���}9YWQyw���#g�|��o�q�6=��w�ެ��a��n�[9t��D�HW9�������
d ��u�������oLXÁٗ�%tf������H@V.�#��c���|ھ�O�Ç%���O=���>���\��D�/��~r�2z^"��ţ�E:�ē�VT����/!��|:�����w&ݯF4d�Vl?���+r��3��m���G<�yZr�xNQ�z@)���T�+!���H�ZU5E�m��}�_.^�\}��UX�U��w�L�N������n�.��q�]n�
Y���1�f��?C:���� ���n���/Û�C��Jm��_����?ɿ�E�,ʗ�Mu����q������O6'�/`zf�ӿ�m����&��e<y��[���m�F���>�2�W���K�3u]o~��e�2���\]���)7
ަgk����j��o���ߞD���M��+m���>�� \��^k��b��]՛�LG+�ww�?����o$��6˰�b�_��K��-���t�ß��?���;}���a/��������������ȷg�����s��d�&�ޢGh���@+n�B�@�=춗���C�U�b�h++)�s�n�1��'��"��<��%�'P�dθ,Z��j�Xs�����5��f�զ.S��h=����8]��?P�T.H�j�\�,�;Q�-
آ�J�Õ�M����Q<��C�`���L9_�Ζ����F��v;{���E$�ƕ����}<�^G/+���f�|9쁇�x����G5��Z��tSė�p�a���1h(�`<�}���,*!�6U:��%S�w�^�b����o���{.��g�q\��p�0���c8X7��2ظ���2�ޝe4� c��3Q�Ȏ0�ձ<�1�iJ�q��Ӵs��r��П��i�n3�_�_�o'flj�Bz0�o6@�<���XD&�4����l�����d+���h����q|ޢ?��p����eᴰo*�ˑ���a�	�kl�e��<q��՞���[k	��
�^��L���t�Ϙ�y���Cb���`�VmWg��/[��G�)!��LK���v�Ne�=�+�1x�a:�CBm��Ζ���C�ݰ��D���?�!Wg���F�@V��+�Ƨg�ɏawy�GC֣�,�-��m����&\..��������l$?\�)�g9q�MW�Lϐ�����TG��גǿ�-.��Fj�3
";���"G{8�Z�2�g�Q{�"��"�˱��s��營���C��FX�+C�t��H�K�Nû���~��V:��,=oMн�k�2��0L���9i8}>������!X%B�߉�+��/�	*EP���#�u[��d�ƹ{oUk�3g)i��v-X�'�Ufg�e#��P1�s%wb��C��%��T�2�L�����~y������DC�����57 f[�mBz�2�G�e?�N�1��_:\�s�;�����$���H�8��?WW����w���[e�t���˸����֔PXkm47T�7c/��e�����ax�__���i|�{�6�C�t�\?��9���Ù<_Ɨ���L��ʨ0��aOP���i>'.�a�s�2\��նATl_���J�mk�~� .�n���k!*!�x0+�
E�[cp\ndU $V-���t}p�ÈX,�{���:l�t���(���H؞ ���=�`WUk�h; �n��:Ć�����{|l�2�j �V>ڦH�����N�#�j�i���H3�/�^ő�����Zz���A��`j�"�����0B��[>��ו��"�0��0K�lج����mK�&2��v�C�� qB�0PWs�� GJ�u�I�:��6�QS,Ǧ����!��u\����e����0'Z��������:a��,~ОE��)UIh^��)�E<긛Tu��"��o[[�^HU}�7���]M�
����PvD��*����z�;H���AB��5Ը"��D%a/�:qDܺ��J�i`�K�i"�@�O���6|�~<
�^��$;�����'./�7��q.ޘ~�Y�lIe�+�ÛT&�N+T[C�O�7�לv��|�:2'Խ��,aż���Ѭ�~r�����a��U��x=ؿaɟ�)��z�o �Q�,b��|���m�J�Z�՞D^$2C�x9i?�z#�w�mPy��Cs\�j��}��Я��~�E����͠ɳ�k���2e�ף�<���1x�~��x0X�u�1��Ewg�a�������$W�k��)Df��@)kB;�<P��Kϗ����z���6�i0C�]>�Áo�0��ϻfqmǷ�t8L߮^é !��R�;CR�(��u�(6e&�6\ߜņ¥�5�sh�@�_��x�1��eO[
�$5E���μA颰��
<+z���R|�Sn���^ӱ�g3$���tfPX����j�E��"�_��)���ww*̑�vZ�>�k:�Ɠla%(%0&l�Y�%ղ�����	�_Yd�9��Ӂ5�O���Y�v�E] ������-&c��\w��hBX�P�3��3�}G�w�Є����읮L^���SBW�w��79C��Wc��u���|QD@��z+i�����}|nl'[�
=�)���.1n�µ����x���W&����)�� 1�oy#�vv�cP��3DWm�e	���+T��ԪD0Pf�&ܠM�l�cS%c�E��njЀ�a`��Cl�C,�ˤL�y�ۨ.�wI�px�m6kS�y���\�C0��Evv	�$�A@�n)c�s��!��F�x��*g�k��S#H    ��6�F��<��8x����X%���o"��y�'#�NT�>�#SHb[�����u>5�;�B�l��(&LU��\�O%_EKx�*�~V�	)v�#����0�'��椚W� ���a�,�z�ㄬ�II~l���ԁ¨�,$J�$T�����Na�Cj��6�8)(�J�2\�&9���� ���i*尿�,n
�6$�x�Ev���-�1U0.ݫ�~�0�Lgt�x6k`�ľU7���	 ���X��m&ӟ�6�����5�����cX�)fj�6�X�l�)$f�3�tģ�������r0����.S�`(ŋJâ0	AŒOcp���9�������^��F
��?B5���Yl���6�k���w�1Kha���K����*Z
E"P@��:�����b�����vu�`3fA�gF��ˋw5z�F8�����p�̈`�	d/`b�d���z�сh�o�~'�n_���dc�����%W�DX�z�|Ө��"LN�,3t���B�BI�D��<yN#�ᘆ��|���~�`}�Fy�H��<���	Y��nd%
�5$%K
t��ʐ ��#Z�f�����x��=+�gU��*ˇ��<�m�[thwdW�.�mk0�w�%<8�SFA@әp�N��jp^O�p.�Xi.���X��"mz��<G)�������x���Ӣ����D ��0G��4�(q�a7�{B��7\��+��%=�#B�X�����E%�,ͺ�'_��슺K��/P2>�[m�9�F�i >�c���x(��%�{�FςQ�t32륳�Դ�s��j
${�ga�&��<��8���e[�*�`>�%C�z��F�:jV��b�儫	)݅�\�q���C<\�e�
�L��)F�r�%M��oHX�hO�xI� �x�L"�Y=��l��7�L8n�xVd�8�J�8��c64�Y5W�X�8�&�z�����>�
���3/�Jz%��Pf{�u-�Bp:g�jm���m���8�hs��ҧ�?�9m��}�!l��*���{�S=�*&�6���vo� !�F#\K
4�$�����9	�^���J�E�J5��X����۰��n�)�YQ?��l=�O�D�h����%������8��F��0���6�4q� va_�8�G��kzV�a��V]�j ��mo��� ܲ�	�su��_`[=3���P�l'��#�g���m*���������	j��� |�%�l�~,6���@CJ��1�揊k��N�KzɆL��6�̋��j���)h�u��o���S���3]ٺ����;�;��M�q,r�����#�|�����$Z����9��.ވ��xE��s�� �$̬M��Ͻ��1éQV�7N�y>���]
����S[S7]�[XV�82�n��9��!��������%��)g⊄=H)k�.\�(�?���c��-���::������ϙ(��8����a�}9����߭O_�k�rg\уl9�Q���1^�މ�|����'�#xF��.����� �8Ԩ*�-aw�:=(�!˅P��=�����m	�<�6q�A��&{rN����ֶ�o+�Q'��P�("XA�q��#��km^<4���Y-$Y+�V��r"4"jƙ���Tg���G|>H�u-�E��Q�Lu�=��e�v�p���m���a�Ys���BL����ɕ�$�;:��Y�$��l���z��{^�`�X�o����[�f�N��-nM��l�ڽL%8+%B*���e�Dt���6�Y�pH�v>�+.�K�=�%��ǳy1 D�D�^�;��'Sc�Ac��G�)"��/9���$��PŘ-�I�S�*P.�����q����jnVW�O�`hSw�R몗%���⻔��N��gBD���@��sk�=>xF3�u�����&ʅS�c��&�����k���"�~e���^a�I7�'�n�_�g�ެ+/�Q���L�e!�!��B�"�1���d�E�h;4=x�|�.��
G�*/���T�"*��JF0�ORA���9+�$
F�|`���l�p[tw!������m�u(��_�Z��Ɵ�X`�6���d�0
���;h9��߳�����ڡ츻pJ���&��O@�t�&��bq��q�!j��3��H��^�N�+{|���6"ɞ��ī|�_���͊����K~��^��$�>����:�X�J:��t�3�)��^�͸�Yn����߾��Z>�"�9E�I�*a�Lv�����K���˪���*�~^��]^�`Q ��W�=�5�I�n�Rz�00M�#h`�QN5z7����"��,i��B�K� ��8c�c����f%�L��8��X �d���e�\��/n$���h�K�����[!��n}~�����4��Q5�Wj��-#��F��{ ����:��J]�}�z��� �tT���,�cLkF�H / �L ��E�c-ƶc����;�MC�����r~�9��Qs����U4Bf&��E2��0S�s�t��������+Gk7l6��vy�}<��
 ��q�['��&jz�"��=�Ŏ�5�C�F�L�b�P���Oy�f9�b���ƾ��T��-�')w�×�c�F����kh|q�
�5�B|Ω2��{A��V���?�7BKW��_�q���`��Cx���z7�?D�㉥
������l�"V��~�����"�a�D,���	e:=��I�̨~4WD�mFo�UXGC<��e�Ŗf�K�P�P�0�Y���y��"���	�9K*j`K�5�"�P�}.�r�]��+�,�en'��b������CBd�on�A����͋���x��A��9���V�en� s���N
#�`�����h��!h�M�>$� kM�8�.�Q�ebq�����3,H�3d(� ���^Av�U�W��E��t�-mL#��������l8�� ^=�|�X;�.r\����E�{ԏq�Y�����T_�����Z�,�Ģ�I��8_,�������jHu�%��Rh	��w�0��0�����%������C��t ��9�bƽG�`j2��6rFVv��]�b���:ޒ�S��rR�-�A(����=)��fB���}.ݶ�@��n@*<�NU==�n��!�Y����P������4lQsv�4v��>+�d�ϱ˕t�;�)@|[�� �)�}��(XT[M��y���*�zR
���(mSK�1��!i����@�5^2�'q�Rg���2iF�2B	�8y�S8��qn�3�!S'SgPNŊ3��r�I�8�:tZ,�Ȧ5Tq�1Q��:�,=��@�f���C�A��.�E��o�*PrZP����;GJ�ɞ.+��S�Pahh��t̪3��>۸�iK���0ʦ{���m�R�.hF�k���v����9�6�����������RF�*}�ڢ �F��7������|���oj�����D��@2^B`g��a{���Ed^�P�Z��=��{�n��%KI\�E�����z�J�6X�7� ����Jf��!������]��A�4}�g�^�Zn#t^�,I���l��k�H,s(��$
�J,�1�i7A]f��c����gg��ÚD�LTSЎF�2\�L?v,zM 5�aͼV�҇��V#\���:U�B�M!�nyͨ� L�;�X��aq�_�WN'
\���Z�֮1�~%Z��!q?)������g�jU������t<�ɂ�q��U}2v_�%�^4�Szc#�ƕ*�*4[%"R�a�T�e��'��1Ħ�%�+)8)(x���J�A��:�<�n�Uus�&�p�h�G[iR/�ze��<��ލŬBį'^aX �E��ȣDhs�jC#�X��*!`�݉�������Hz�Ee{��D�����m�_�����d5��g�y���r�T���d9Q��9�6z++U�ڠ/��Z���`j,�!��>�"G� �  �^DTsŎ�-�L�W��"��a��^�����vO����~�����r�6	p�2�$���Ef_w�OD3��7F��7s�N����w&����@7X˓U8	���G��lD�|L����'W&H�f0�T���)�#��Kĸt���"��0��葢���`VfO�~�Xa�c�؟\��-j��2�y}�������=��v�X��z�?Y�Sa������4C�/��C0嫸��m���FuE�i�uF$w#֦<�@����2�ބ��$��|T������ ,�_�)��l�>\�G1ѳ��p�p�/��~Xu����f�w��e$
�8tQ���Ò-�c�2B�44S��%
H���!�)2EMa �X���u��x㬪�*&����J<Җ%>T�c\\�&Z�z��b����,"rٮIw*�)aoEjZc0������{�ޮ]r	�z>W�H<)�2t��Knm`�Ś��I�#HK��}���f#07�%.q�U'>a����x܈~O����l����ш��
���,��j��2}~�4k&s������M��'NR�!��GKjm	e����.�����.׫&�Gd6X4`�so`.���|��E�X��3N���,�)h,
���K*�l&�_^�@-�Tz�'�Cv,=��)�����G�<�1yӼ��)�VVG�8m!p������:oX)%�.� /v�C�93��Xv��v9C��D��B���}M>����3\������ўJz���d��s��)�B,��x���[|j^"�\U vi˨��Ǐ�	�X<:���4��E7	��o������x����.����s'�t�V��ĕA������.�1ayB�)`ĕ)_dO���e�Y93���،�QE�0��QB�7�&�q��������z�wtL�������V$��Q͆��&��&�d�#�ٚ���9�*�	L�E\�f��x>�H�$�SVdʴ^Z!�2��qa���tO�����nq���/W�%�t�Y�f�%�A�%�l��x�Mݨ�M*���+�mSإF�U;���)��V6g���C�=Ʌ���IYܰ��j�<�ZBk6+�Rٱ��C�_K�t��N�%�	-���3�(ƫl�Π��ő�%�S��d2?�pbv�#Ъ��L��T�d�6pLX�I`��$u��W*B错�9��5R���j�d�e�/��3zK�ɠ�"���b�%YqVj��f�� �#�fb����-<���}�l��`MDՕZ��2<9i���d��?��v1�]�=wc�!3�1����t���-B�#�\X����X4�z	 ��qߖ�b_�e��res���~�'��y%�L�H�/�Dyn*W���at(��etV��]��Pfs���
n��+�G � GT���4+Q���p�ЊHp�Ѻ����,#�#\�I�\���7"�^;������$���ic�(���8\�����įX#C�v]%V>㍋i�X�62#�g/l�3��q`e`�-K��i���͸�k{d���R�/]Ֆt]d��D�#S���t�Y5��Dק&4ǻ�p	6��8&�Z���'K��q�)�� � �X�by��34%\y�w��di�P5�h�p)�E����.��'3$l����;��Q]<��Id���4u=�A��"D/����zzz�?� �      k      x��]Y��:�~v���E�c��ht#3��yi �ʪ�b[��vrS�~(�#�"��|�ȳ|g5�v����]�c�z�.>1��(w���쎗�Q����t��gӾU����Ϸ����~ڝ�������N����O�&�6ﬦ�K�U��~D����󤆏�zP�+��] ��K�C��p�t�zV{��������w2�����������8[�OG�����p���I��!Y��������0��) ���G2䤾�~R����W���<����ޝ�A�c.�S�e�_�\�{�S���&R�~ԇ���:�!QsJ�/����Y� �'}�r�������'��1�dУ��G-�_���Z��xj|�O}�ۡ�q5��X ��ޱ_����F}��E�M�OpL��U���Co���.�Ò=m\��I���ט��" Js�2�e<�r��0�}���g�*�k��������ejs�"�e\��D��t��'-�3���r/?~%�Z��\�^��߾��I����{9Lõ�qQڰ�,�e:���kӣN�1r�e�6a�t�X�A�E���#���p:�?P��Z|A��y���R.��bj3���=�\����7�� +x��r'@�u�N�V·��2�x�5|z�,���l�}VR���	�Yqz��0�������z��Շ��g7��B{�z���O� Hf�f�^���yT�m�9�o�~�������
����㯓 s�<�SU͈<�˯Z�^�ӤFī�� �&�Zīr�l�k Y�v����$+���}?�r5��~���:��~�ʅ��8���c�|��4�L�����k>���P�ur�Y0��_��Q}������頾�4'���ҟ�U�^5���&�9�j�u����������z��+�Xֶp�,�b�^4+8��S�H]l3_,s�|�����ݨ��XQT��|���,3�����l��3l_��b��o&ڱ��v�N�m�L��e��\N�ة�c?i<Θ��O5��$Ϳ�4���(R�DJR�Li�?ͪ��ZQ�5��e�;i�@����9<3�j�h�<����T�49R%M�������]�	��%6��|��7u�O�_���y�~���Q��S-ȿg��m�GͿ.���<z].oάX\V�O��fcD�I��2�]���>�Z�z}f�mIB������ Z��� �MpP	��E�ѯ�y��g�~��ɞ�9�Z�K��:�I=#�X@�������W>v���6hU��E�~�˵05��igM�u�X�}:ć�&-�=]C���
q���=��'B��jH�h��JQa�	��#��[�%�i� ���,�����"��G?]�4�H�Z��P�����:������+%���S}�����u��&��J"W-�ڃ
U2� h��ꃴ�-r�3N�f?7�w5��U��M�5�evq�����-��]}��w�����Єn��TI��E$aP�-�u r�.:`��X+�r�V�+Y�YF}����h�|��NHc>�:�WѤ!@B�ԡFn��!{	c�J��|m>���g2�˚��8S��w����2Zh�D�%!�V�!����xNMm��r[YPdkk���=
�1����D������?D�N����]����q�n�����]�X�IhÌ�^$#�,S�6�ww�4N�}�,�1¬R1}f����q�^$
X�˙R�z�Lë&����Ψ�-���W��N��{U�����NF��:];m��Nr�*Y3���Nݴ��^FTNɊ g�u�9%�Eu��ȡ	t�kB�:|�'�F��/*2v��t��[�xu�}~���~��6nEJ���A�%k��3��~Ug՝�i~��~�lya�?��:��>�u���-6�����E˵'��=R-��yb� ]����n�L����#����Y�9'�)eY���s��EcښI�.�vj�h횲���N���mP��#F:���)Z��[ʂ��M�ܔ�ZN�Γ��#,�͛@:�DF2>��E�hZ
�,�4J��87/�M��Ɗ��-
#�%����Ka�vNQ�Y�'�/��H[������9z �9_�"c�����k�a�����q�@�{�=��q�/�l�4�^ȫl�G��h��e&�R�ҠU�|D���Iī�N�!��$��e H��4Β����1 n�쇐kB �ix�(Q-5��Yu����{�'�ig2kD�)� 2��ǩ��L��E�:��h�3I�JJ0�tV��>P;,Gټ�#7 Vr��|�Dy@�$?�x�M�vo��4���$�[?�Ӿ{�����_����1�L_���F�dQ�Q����a����6	����dI��&�LHI���7
bM0/�w���m�H�w�5�2VY���VM������4����eAU�n:ĈN0l���t�Q6p�1y��w� ����;G���T� ��:|bc��S&Ks"��%�m$j|����Ŋ��o�&����S����"�<�	��αO��>�ԡ8�
�ň�����$V�HԒ�c��ir�}R�O�GB0�^����U�5˔Q��m���K֢"�-if��9�����5���}o�E(���<=��5R>��E��җ&�%�B�.��w��-9�<:�z��K�9�.�������:��QGN�;���:�;�X��79�㔦�>�[N�b1o^,ISP���v]�bY1�	rϋP�?ҏ��3J3�y �wmBΌ��s?l�7<ϭy��X����E�*���x��Z.����RK�jY��"c��K=�����:���i-KJ��T��Z��w���Q��YrKqGK���&�?��Y��ӓ�dT�k�q�N�et�Y��!!�hf��[<Dĝ�H8�2�N�t?�}�C�^�v�����2�-�`���Y����䚃���,�!}�����^�e���*�b�������Hlm���Ω��$��A�bi��$in�s�������q	���pT�QM�Q��mNG,����+��ȕ20�uhԈ�Q���-�OJ��-6��a��:�+b�+��,���� _z[�	��N��*V�@4k���j�d%Rl��3ٲ�K�����=vU*Tf
��^ s�9u��rYX�گQy���J�4����|߫�^�c�o3�gD��D����8(�R��N/tD�����Qt��i���T���A<���H��>��$��������H�.G���f~"���,��hX�[�3����hF%�H��N�F}��t���W ��<�G�ݸ����;��ٝ�$�%��<Ė;�dJ}s��}�I]qh(=�C]��X{ɹ���.�Q�.K~;7H3	8���oA������K� 4��@��<*�d��߿����sZ��ż��`rE�z\!](9�;�n�r���-�'��/��fb-4��������7�t��YY.'!A�YSqh�� }|���$���˶�Kb��PY k_d�%�4�\g	���g�H�Tm)}̘es����Xy��,�����s�|��vP2�t��z�;���~)�*�@�6Z��(�[�X�fkv��Ǫ,vR����I���$o����$s�\^����=��	ź/#�@p[�8�{���θ:y[�6�'��/T?������,\�^b�2g�{��\Eټ��g!$������r;�1�W���˜����� �<�����v�a�N��8�&�F�мZ<jh��ks�Y�F/��*��e<KU7���j��*�����F��c���3R�$�E`��7*�+Q��t2��Wx���Z3���Q��<V�W�
3�IP���ְӘ�����
t$H�?�Yز��G���jO`S�����k������*F�z�\(O�1y�m��)^��]̧�/E�����X��+���U]��ז�6������2��)%���堞��/*g�ئ؈K�
�U�鰛,D��
I����2ߵݺ��0�z�=��C՛(8o �Z���N�%~��ߐ�@HZ���*� t  �9�&1���jѮy3�o�,�܌�3t	��]���D1���z��M0u�Wc�DE)A17�Π��W�ykrd���0��� o�%c�ٕ�2Ib�47ob�kx��|O��hw<]��m��q a֌fv�Y�X�)��XI�iSe�t�%��<{�u `���CF[}+�Xfޮ�2փn�2��3A�-��945S��Ǌ�S(���F��{.0���YzH��k ��J�F�2�X�o�$B@�ˇ:-���� v��C�-1�A�'3�ӱL\��0��);�
Ȁ��Tk̇d�C{����e�OK��ФO��{�p��*E���e�$aJ����n�X�wj�������"��8�D��y�I�B@�
�>�C�7�	FDy�sdj��A���v�i��q��ƽ����)�xf$�tՒ�(��=�X�qJB5�F�YFVDPo^V�c�тP�B��`�6ّ����r�vD@´;�<m31[�	���"��D��'�^K�1O�o%i�7��J�RɇP�JAցާ�M�n�'�z�%Mn�74�*doCS��k�����F]�s�,T�+���G��|�n$K����ו�\��͊nC]醊���rؤ���	@|�eۣ�ք2�"��m�)��U�t�fl�E�EK���5�^�7�����:K�:)��G��p��jW�)��R��+=c�34Q?l;uQk�cZ���Ё��y���-��T2O֎#rS]g���Ʃ�W�;����oz!�D�%cUe���L:U<���lh�k���D���2w��%� �f��G�T�wp�@����%�pM��YI�{�����r��p��|%�`I��DK��@GXm����&���8�bwKD*�߁ �J3OY�~�

,�ljڻ�'�V�%��h�!l�a[�k�p�G�
�&M*`6	���6�TF�	�I��sI��0 �jp9�ȵ�^F�Ih�b�� �K(�H�*T�O� �ޅ�p�ZJ�g�e���O5IX��E7P����!��ͱ��"���6�j�o�_Y)q�'#9`��ʳz����Z�Q`>5���t�֡1Fo��I��P&��j� ���!�,�;.��l�l�������>\w��>�)������R�A���xzz�-�s�      f   �  x���_o�0ş�wq�-]t�la��^�^�1",nD�O�{�b0P������[${���*����LW��r����ر̏�G�]^^�a��x�������A��$�/}�N�i��X�Kz�(8S�����2 �D����V �P�)M�V%���s�6{�M">�~��<"i��Ӓ=�b��L"K2uV�o�厖AG )�]�4φ�r^�ǚp�B��Ңt�R3�E�.�b@C�ݪ@�v8ꀠ��)�O	�"�q��2�i�H��5S��(�HAZ�"8M�h+i�VY�h�!Xohx�4�$`FS�}߆�G�B�:g3��rV�O��b�mr.�Mƍ+���tH����6�|�{�W�jH%"@V�>T:t	�(h���Ҥ06���#҄K�h*���\���n/�E/.ق({��g\�SmI�����*}���&n`60�ɦ�HhiKh�f�n"Z������ץU���L���d2�	hN�      g   ]	  x�mX[s۶~F~���LN��=���؎,�Gr�i�3���o
@J�~��vAp��8�o��e�k���|A�&�`����oԿs�{�~US�mmU�e ��A�9XG]V�Ee��L���.Μ�g�dv��D���}��z!D�}�NT�5��D9�rd��e��W攭�9�z��x��0���-k��c�f�M����q}�V��h]h�i�5c=q�����&�L�5�ʙuѩe��	/�b�v]f�#�ܫ%#�a@Qj��&��ɍ���r�D���(klN�S�z���Gɪ����)�C��F9ך�݈`n\Vw4�f�8�z&����NM��7L��=���X�,�L����fN�ޑ�;x檯��S��*�h�-��M�y8�N���&��6��x`_�����9:�&w��(���b��S�Q�ko��e5"8֥�_�l�)��r2Z�^\� ��	���#����Ckᎆ���Wds��+�j�H��
cg�EVVD�����Ӂe��g5R �����ep޺���t� �i^�S�〫!��\S��[��m�o�V0��
B������?�UL�Љ�	i��HO��TnO]�׈)�)	��15���E��;��\���]cԍ��4a��e�B 4��p. ���Q�Ã<�#z�̈́[/�c_>[Ce7!�)W�=�0FQ�t�B�]a�^MB�Ƨ��R�Y�+H��w�B0�2ܢ�k�p���o� �6�t�Mɛ�CX�)�����l��|�lPb�J�[S�7|Xx���wm�p}��w�Q}b�p������GvtV!���~.t�ص&sm�a�Lĵ����bn��[��u8�Z���(Q�{P��������:�,r������	#ʮg}vl��p�@?�����ȑ|��9�(C�4����	h�B���H-8���J�Ҧ�5gR�Q }'�j2��I�$�1�o@���v5�I�"Q�ٸ]����w��A���Ump�S8���Ÿ́�GcV��'|Sg����黀�]�[��wܹ�Z�.��D������B�%t�.���%��5��D��u���p"��8|`�B��h��@S�W����{�Q�"�e�G�r"u'H?�6pX�f����N BV`�,/T�jxq�C�!pJ>�!���~����{�
���ׁL|��"�9|���`�eaG�N-*�b7��9.;Z�K��(�����G��	:���:�Ĵ�z@*�(w�a���	�m�.�U�85��1��l]���s!,􉑞h�V�i�}�7ٽW����b*����m��(@�8�2���9�諺�9�@G������ä�0�CcEy�����8`�8Jz��*���!* �Ϧ�r����'�6t�8�:��Y�EXeأa���ŋ[o�\�3����ǝ�2@=	0݅���~��ܺ`2�,���Z��F��Qe<�0F}����WH"�(c��\`��/$��n�g/"K����%^�J��!�@�!0�ɾ2aC�Dcv8��Xw	S>`f�ۮ���#��;$�]�Ը�tO:��hQs΄ő������q�
��V����~g�*K�+3��1��/:�~��_9v�#��RN�lC�o_-�00�ǁe94`z������>v�K�K%(��P)B���X�TZ�� b��}V���x�mu@�4�xDY
/~ ���g�_I'�P�6܈���*m�C?�������n�_��~y�[ܿʑ�Mw6F�
D�����t3�'�L>/���p_Ĝ<�|g��A�PKz) ���>�h�{��[t^3a釄�C��kiH�E)�̷lM����举Fc�P����ҷ��T�BZ׶�<Ǡ��'�@'��Iu��''������!�u��|�\����p��rV:�R~�{�ѧx1aCm\���8�F��s���9��9\Vԗ�$żE��B{j�,2)�h^q�^���ľ���QV�o��
3s��C�Ƹm��F=�/8nd��d]��{�@?�6Ӆ��f~H���ḓ'<m�ptN,Eb%�
S���>�/�yo�a1��O^0ʕ��0u�æ�208yhg�A+ݻ��"�����?ߩ�Wd��������kdK��]��Q���p�	��Q[ҋ��:�~>�Cc����M�ԃ =hz�F�_4���Q�ڟo_���
�G�7�]*�^�OPϓ?�'�3S<�$փϜ�{���u��m����9ΖQ������'��b���va:J4m+�a"�ed�qe�D�����^��=�Rԏ�yN�T�g�����qΓ�x���{n�0�+j��ׯ^��?J]��      b   �   x�}�ͪ�0���S�	��?W��%��"��ml�%�$b��m������L�jK�j���_�zӬ�q��y���]R@<C�ԍR�jF�q�������t��m*��V��^B�Wz3ԑ��n]�t͗����ho��A��Ɩ���	-�B1tqoZr��Ş��g��ө~p���!��������XTl��l�*���͒$� ��6      `   �   x�]��r�0@�ux
lI�'�Ȫud�:�7	hL En��e����wb�7�7�.��[���*E5�(*3��D���=p��]�\i�)*��XqgDZe����X_�a!�9]9g{�,/�D��T�@m\�{<���@���u��:�Ӎ'����[�n�����Y��>k�F�P� 8��|2����@|��{��s��M�ӌ_uh]�eY��I�      d   �   x�}���0���a@E,U
��9H�d��f@�^D��b�+�m.B.mI�7ۉ��qm���$��u�	e�ul��3=	Ǳy���9i���_Tֵ8���Kܽ��~�7�����6��K�f0��BQC��!�#�ZCH�4�!y7
Q(im������6������     